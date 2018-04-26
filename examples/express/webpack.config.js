'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',

  externals: [
    nodeExternals(),
  ],

  module: {
    rules: [
      {
        test: /\.twig$/,
        use:  'twigjs-loader',
      }
    ],
  },
};
