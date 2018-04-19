'use strict';

const Twig = require('twig');
module.exports = twigLoader;

Twig.cache(false);

function twigLoader(source) {
  twigLoaderAsync(this, source)
    .then(output => this.callback(null, output))
    .catch(err => this.callback(err));
}

async function twigLoaderAsync(loaderApi, source) {
  const path = await resolveModule(loaderApi, loaderApi.resource);

  const template = Twig.twig({
    path,
    allowInlineIncludes: true,
    data: source,
    id: path,
  });

  return compiler(template, loaderApi);
}

async function compiler(template, loaderApi) {
  let dependencies = [];
  await each(template.tokens, processToken);
  dependencies = unique(dependencies);

  const twigData = {
    allowInlineIncludes: true,
    data: template.tokens,
    id: template.id,
    rethrow: true,
  };

  const output =  [
    'var twig = require("twig").twig;',
    `var tpl = twig(${JSON.stringify(twigData)});`,
    'module.exports = function(context) { return tpl.render(context); };',
    'module.exports.defaults = module.exports;',
  ];

  return [].concat(
    dependencies.map(d => `require(${ JSON.stringify(d) });`),
    output
  ).join('\n');

  async function processDependency(token) {
    dependencies.push(token.value);
    token.value = await resolveModule(loaderApi, token.value);
  }

  async function processToken(token) {
    if (token.type !== 'logic' || !token.token.type) {
      return;
    }

    switch (token.token.type) {
      case 'Twig.logic.type.block':
      case 'Twig.logic.type.if':
      case 'Twig.logic.type.elseif':
      case 'Twig.logic.type.else':
      case 'Twig.logic.type.for':
      case 'Twig.logic.type.spaceless':
      case 'Twig.logic.type.macro': {
        await each(token.token.output, processToken);
        break;
      }

      case 'Twig.logic.type.extends':
      case 'Twig.logic.type.include': {
        await each(token.token.stack, processDependency);
        break;
      }

      case 'Twig.logic.type.embed': {
        await each(token.token.output, processToken);
        await each(token.token.stack, processDependency);
        break;
      }

      case 'Twig.logic.type.import':
      case 'Twig.logic.type.from':
        if (token.token.expression !== '_self') {
          await each(token.token.stack, processDependency);
        }
        break;
    }
  }
}

async function each(arr, callback) {
  if (!Array.isArray(arr)) {
    return Promise.resolve();
  }

  return Promise.all(arr.map(callback));
}

async function resolveModule(loaderApi, modulePath) {
  return new Promise((resolve, reject) => {
    loaderApi.resolve(loaderApi.context, modulePath, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

function unique(arr) {
  return arr.filter((val, i, self) => self.indexOf(val) === i);
}
