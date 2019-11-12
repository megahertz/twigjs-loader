'use strict';

const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },

  devtool: 'source-map',

  entry: './src/js/index.js',

  module: {
    rules: [
      {
        test: /\.twig$/,
        use:  'twigjs-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.twig'],
  },
};
