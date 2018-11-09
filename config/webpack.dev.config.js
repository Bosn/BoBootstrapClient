const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const METADATA = require('./metadata.js');
const path = require('path');

module.exports = function (env) {
  return webpackMerge(baseConfig(), {
    output: {
      path: path.resolve(__dirname, '../'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    mode: 'development',
    devtool: false,
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      // hot: true,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      }
    },

    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../build/lib/vendor-manifest.json')
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
};