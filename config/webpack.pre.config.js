const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env) {
  return webpackMerge(baseConfig(), {
    output: {
      path: path.resolve(__dirname, '../v2_pre'),
      filename: '[name].[chunkhash].js',
      publicPath: 'https://cdn.bob.tech/v2_pre/'
    },
    bail: true,
    mode: 'production',
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -20,
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ]
  })
};