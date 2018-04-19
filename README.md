# twigjs_loader
[![Build Status](https://travis-ci.org/megahertz/twigjs_loader.svg?branch=master)](https://travis-ci.org/megahertz/twigjs_loader)
[![npm version](https://badge.fury.io/js/twigjs_loader.svg)](https://badge.fury.io/js/twigjs_loader)
[![Dependencies status](https://david-dm.org/megahertz/twigjs_loader/status.svg)](https://david-dm.org/megahertz/twigjs_loader)

## Description

twig.js loader for Webpack


## Installation

This package requires node.js 8 at least.

Install with [npm](https://npmjs.org/package/twigjs_loader):

    $ npm i -D twigjs_loader

## Usage

    ```js
    var indexView = require('./index.twig');
    console.log(indexView({ variable1: 'value' });
    ```

**webpack.config.js**

    ```js
    module.exports = {
      ...
      module: {
        rules: [
          {
            test: /\.twig$/,
            use: 'twigjs-loader',
          },
          ...
      },
      ...
      resolve: {
        extensions: ['.js', '.twig', '.scss'],
        ...
      },
      ...
    }

    ```

## License

Licensed under MIT.

## Credits

Based on [zimmo-be/twig-loader](https://github.com/zimmo-be/twig-loader)
