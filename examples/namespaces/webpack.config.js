'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const LEGACY_REGEXP = /^(\w+)::/;

/**
 * Transforms legacy namespace::template/path to @namespoace/template/path
 */
class LegacyNsResolverPlugin {
  apply(resolver) {
    const target = resolver.ensureHook('resolve');
    resolver
      .getHook('resolve')
      .tapAsync('LegacyNsResolverPlugin', (request, resolveContext, callback) => {
        const requestPath = request.request;
        if (!requestPath.match(LEGACY_REGEXP)) {
          callback();
          return;
        }

        const newRequest = {
          ...request,
          request: requestPath.replace(LEGACY_REGEXP, '@$1/'),
        };

        resolver.doResolve(target, newRequest, null, resolveContext, callback);
      });
  }
}

module.exports = {
  devtool: 'source-map',

  externals: [
    nodeExternals(),
  ],

  module: {
    rules: [
      {
        test: /\.twig$/,
        use:  '../../index',
      },
    ],
  },

  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src/views/include'),
    },
    plugins: [new LegacyNsResolverPlugin()],
  },
};
