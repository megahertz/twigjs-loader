'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',

  entry: './src/index.ts',

  externals: [
    nodeExternals(),
  ],

  module: {
    rules: [
      {
        test: /\.twig$/,
        use:  'twigjs-loader',
      },
      {
        test: /\.ts$/,
        use:  'awesome-typescript-loader',
      },
    ],
  },
};
