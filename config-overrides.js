const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');
const resolve = (dir) => path.join(__dirname, '.', dir);
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
  addWebpackAlias({
    '@': resolve('src'),
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
  },
);
