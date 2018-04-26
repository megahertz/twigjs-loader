'use strict';

const path                    = require('path');
const nodeExternals           = require('webpack-node-externals');
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");

module.exports = {
  devtool: 'source-map',
  target: 'node',

  entry: {
    server: './src/index.ts',
  },

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

  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.twig', '.scss'],
    plugins: [
      new TsConfigPathsPlugin(),
    ]
  }
};
