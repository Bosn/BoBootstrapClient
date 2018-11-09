const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const METADATA = require('./metadata.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function (env) {
  return {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      alias: {
        '@app': path.resolve(__dirname, '../src/app')
      }
    },
    entry: {
      polyfills: '@babel/polyfill',
      app: path.join(__dirname, '../src/entry.tsx'),
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            },
          }, {
            loader: 'awesome-typescript-loader',
            options: {
              happyPackMode: true,
              experimentalWatchApi: true,
              useCache: true,
            },
          }],
        },
{
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          use: 'source-map-loader'
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
          // embed images and fonts smaller than 5kb
          loader: 'url-loader?limit=5000&hash=sha512&digest=hex&size=16&name=images/[name]-[hash].[ext]'
        },
        {
          test: /\.(woff|woff2|eot|ttf)($|\?)/,
          // embed images and fonts smaller than 5kb
          loader: 'url-loader?limit=5000&hash=sha512&digest=hex&size=16&name=fonts/[name]-[hash].[ext]'
        }
      ]
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      // providing the lib dependencies so that they are present in the global scope
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),

      new CleanWebpackPlugin(
        ['dist', 'assets'],
        {
          root: path.resolve(__dirname, "../"),
          exclude: ['index.html'],
          verbose: false
        }
      ),

      // insert bundled script and metadata into index.html
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        metadata: METADATA
      })
    ]
  }
};