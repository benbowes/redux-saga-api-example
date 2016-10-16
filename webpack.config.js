const autoprefixer = require('autoprefixer');
const values = require('postcss-modules-values');
const webpack = require('webpack');

module.exports = {

  entry: './app/index.js',

  output: {
    path: './dist/',
    filename: './app.js'
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: ['node_modules'],
      loader: 'babel-loader'
    }, {
      test: /\.s?css$/,
      include: /app/,
      exclude: ['node_modules'],
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(
          (process.env.NODE_ENV === 'production') ? 'production' : 'development'
        )
      }
    })

  ]
};
