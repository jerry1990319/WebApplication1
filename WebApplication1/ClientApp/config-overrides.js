const { override, useEslintRc, addLessLoader, addPostcssPlugins, fixBabelImports, addWebpackPlugin } = require('customize-cra');
const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');
const rewireEslint = require('react-app-rewire-eslint');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
const rewireVendors = () => (config, dev) => {
  if (!config.optimization) {
    config.optimization = {};
  }
  config.optimization.splitChunks = {
    name: 'vendor',
    filename: 'static/js/vendor.[hash:8].js',
    chunks: 'all',
    // name: true,
    cacheGroups: {
      commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
      },
      vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10, // 优先
          /* 为此缓存组创建块时，告诉webpack忽略splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequestss选项。*/
          enforce: true
      }
  }
  };
  config.entry = {
    main: './src/index.js',
  };
 
  return config;
}
const addCustomize = () => (config, env) => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.devtool = false;
    // 添加js打包gzip配置
    config.plugins.push(
      new UglifyJsPlugin()
    )
  }
  return config;
}
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
     }),
    rewireAliases.aliasesOptions({
      '@': path.resolve(__dirname, `./src`)
    }),
    addLessLoader(),
    // addPostcssPlugins([require('postcss-pxtorem')({ 
    //   rootValue: 108, 
    //   unitPrecision: 1,
    //   propList: ['*'], 
    //   minPixelValue: 2, 
    //   selectorBlackList: ['am-'] 
    // })]),
    dropConsole(),
    // rewireVendors(),
    addCustomize(),
    // disableEsLint()
    useEslintRc(path.resolve(__dirname, '.eslintrc'))
  ),
  // devServer: overrideDevServer(
  //   devServerConfig()
  // )
}
