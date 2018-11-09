const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    modules: [__dirname, 'node_modules']
  },
  entry: {
    vendor: [
      '@material-ui/core',
      '@material-ui/icons',
      'classnames',
      'connected-react-router',
      'es6-promise',
      'history',
      'lodash',
      'material-ui-pickers',
      'moment',
      'normalizr',
      'react',
      'react-canvas-draw',
      'react-dom',
      'react-hot-loader',
      'react-number-format',
      'react-redux',
      'react-router',
      'react-router-dom',
      'react-select',
      'react-text-mask',
      'recharts',
      'redux',
      'redux-api-middleware',
      'redux-saga',
      'reselect',
      'socket.io-client',
      'utility-types'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../build/lib'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.join(__dirname, '../build/lib/[name]-manifest.json'),
    })
  ]
};