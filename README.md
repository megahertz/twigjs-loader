# twigjs-loader
[![Build Status](https://travis-ci.org/megahertz/twigjs-loader.svg?branch=master)](https://travis-ci.org/megahertz/twigjs-loader)
[![npm version](https://badge.fury.io/js/twigjs-loader.svg)](https://badge.fury.io/js/twigjs-loader)
[![Dependencies status](https://img.shields.io/david/megahertz/twigjs-loader)](https://david-dm.org/megahertz/twigjs-loader)

## Description

twig.js loader for Webpack


## Installation

This package requires node.js 8 at least.

Install with [npm](https://npmjs.org/package/twigjs-loader):

    $ npm install -D twigjs-loader

## Usage

```js
const indexView = require('./index.twig');
console.log(indexView({ variable1: 'value' }));
```

**webpack.config.js**

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.twig$/,
        use: 'twigjs-loader',
      },
      //...
    ],
  },
  //...
}

```

### With Express

 - [example](examples/express)
 - [typescript example](examples/typescript)

`$ npm install twigjs-loader`

**index.js:**
```js
import * as express from 'express';
import { ExpressView } from 'twigjs-loader';
import indexView from './views/index.twig';

const app = express();
app.set('view', ExpressView);

app.get('/', (req, res) => {
  res.render(indexView, {
    url: req.originalUrl,
  })
});

app.listen(8080);
```

### On frontend

 - [example](examples/frontend)

```js
import indexView from './views/index.twig';

document.body.innerHTML = indexView({
  url: location.href,
})
```

## Configure

You can configure how a template is compiled by webpack using the
`renderTemplate` option. For example:

**webpack.config.js**

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.twig$/,
        use:  {
          loader: 'twigjs-loader',
          options: {
            /**
             * @param {object}  twigData        Data passed to the Twig.twig function
             * @param {string}  twigData.id     Template id (relative path)
             * @param {object}  twigData.tokens Parsed AST of a template
             * @param {string}  dependencies    Code which requires related templates
             * @param {boolean} isHot           Is Hot Module Replacement enabled
             * @return {string}
             */
            renderTemplate(twigData, dependencies, isHot) {
              return `
                ${dependencies}
                var twig = require("twig").twig;
                var tpl = twig(${JSON.stringify(twigData)});
                module.exports = function(context) { return tpl.render(context); };
              `;
            },
          },
        },
      },
      //...
    ],
  },
  //...
}

```

## Path resolving

The module uses webpack for resolving template path, so it doesn't resolve
path by itself. If you need custom file path resolution (eg namespaces),
check [the example](examples/namespaces).

## Credits

Based on [zimmo-be/twig-loader](https://github.com/zimmo-be/twig-loader)
