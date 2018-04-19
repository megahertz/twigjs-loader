# twigjs-loader
[![Build Status](https://travis-ci.org/megahertz/twigjs-loader.svg?branch=master)](https://travis-ci.org/megahertz/twigjs-loader)
[![npm version](https://badge.fury.io/js/twigjs-loader.svg)](https://badge.fury.io/js/twigjs-loader)
[![Dependencies status](https://david-dm.org/megahertz/twigjs-loader/status.svg)](https://david-dm.org/megahertz/twigjs-loader)

## Description

twig.js loader for Webpack


## Installation

This package requires node.js 8 at least.

Install with [npm](https://npmjs.org/package/twigjs-loader):

    $ npm i -D twigjs-loader

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
