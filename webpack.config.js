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
    },
    {
      test: /\.s?css$/,
      include: /app/,
      exclude: ['node_modules'],
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
    }]
  },
  resolve: {
    modulesDirectories: [
      'app',
      'node_modules'
    ]
  }
};
