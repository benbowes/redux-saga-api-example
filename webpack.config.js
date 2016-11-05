const autoprefixer = require('autoprefixer');
const values = require('postcss-modules-values');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const serverPath = (process.env.NODE_ENV === 'production') ? 'https://benbowes.github.io/redux-saga-api-example/' : 'http://0.0.0.0:3005/';

module.exports = {

  devtool: 'source-map',

  entry: './app/index.js',

  output: {
    path: '/dist/',
    filename: `${serverPath}app.[chunkhash].js`
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: ['node_modules'],
      loader: 'babel-loader'
    }, {
      test: /app\/.*?\.s?css$/,
      loader: extractTextPlugin.extract(
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader'
      )
    }]
  },

  postcss: [
    autoprefixer,
    values
  ],

  resolve: {
    modulesDirectories: [
      'app',
      'node_modules'
    ]
  },

  devServer: {
    historyApiFallback: {
      index: './dist/'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(
          (process.env.NODE_ENV === 'production') ? 'production' : 'development'
        )
      }
    }),
    new extractTextPlugin(`${serverPath}css/[name].[chunkhash].css`),
    new htmlWebpackPlugin({
      title: 'Custom template',
      inject: true,
      template: 'index.html'
    })
  ]
};
