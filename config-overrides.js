// 使用了近乎黑盒式的CRA搭建项目，需要用到customize-cra创建这个文件来进行一些黑盒内配置的修正
// 此处只演示修正@符代表src的配置，其他的配置可以自行查阅

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
