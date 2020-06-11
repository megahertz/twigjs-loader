'use strict';

const { readFileSync } = require('fs');
const path             = require('path');
const Twig             = require('twig');
const twigLoader       = require('../index');

class LoaderMock {
  constructor(template) {
    this.resource = template;
    this.resourcePath = path.resolve(__dirname, template);
    this.content = readFileSync(this.resourcePath, 'utf8');
    this.context = path.dirname(this.resourcePath);
  }

  addDependency() {}

  async exec() {
    return new Promise((resolve, reject) => {
      this.async = () => (err, result) => err ? reject(err) : resolve(result);
      twigLoader.call(this, this.content);
    });
  }

  resolve(context, request, callback) {
    callback(null, path.resolve(context, request));
  }
}

async function compile(templateText) {
  const mock = new LoaderMock(templateText);
  return mock.exec();
}

function renderOutput(output, context = {}) {
  const text = output.match(/tpl = twig\((.*)\);/);

  if (!text || !text[1]) {
    throw new Error('renderOutput: Couldn\'t extract data');
  }

  const ast = JSON.parse(text[1]);
  ast.path = './';

  const tpl = Twig.twig(ast);
  return tpl.render(context);
}

module.exports.compile = compile;
module.exports.LoaderMock = LoaderMock;
module.exports.renderOutput = renderOutput;
