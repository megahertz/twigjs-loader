'use strict';

const { readFileSync } = require('fs');
const path             = require('path');
const twigLoader       = require('../index');

class LoaderMock {
  constructor(template) {
    this.resource = template;
    this.content = readFileSync(path.resolve(__dirname, template), 'utf8');
    this.context = path.dirname(path.resolve(__dirname, template));
  }

  async exec() {
    return new Promise((resolve, reject) => {
      this.callback = (err, result) => err ? reject(err) : resolve(result);
      twigLoader.call(this, this.content);
    });
  }

  resolve(context, request, callback) {
    callback(null, request);
  }
}

async function compile(templateText) {
  const mock = new LoaderMock(templateText);
  return mock.exec();
}

module.exports.compile = compile;
module.exports.LoaderMock = LoaderMock;
