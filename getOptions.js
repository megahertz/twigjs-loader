const getOptions = require('loader-utils').getOptions;
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    twigPath: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

const defaultOptions = {
  twigPath: 'twig',
};

module.exports = (loader) => {
  const loaderOptions = getOptions(loader);

  if (loaderOptions === null) {
    return {};
  }

  validateOptions(schema, loaderOptions, 'twigjs-loader');

  return Object.assign({}, defaultOptions, loaderOptions);
};
