require('envc')()
var path = require('path')
var webpack = require('webpack')
var IsoToolsPlugin = require('webpack-isomorphic-tools/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isoConfig = require('./webpack-isomorphic-config')
var isoToolsPlugin = new IsoToolsPlugin(isoConfig).development()
var bourbonPath = require('bourbon').includePaths

module.exports = {
  port: process.env.PORT || 3000,
  context: path.resolve('.'),
  devtool: 'source-map',
  entry: [
    './src/main.js'
  ],
  output: {
    path: './static',
    filename: 'main.js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('./main.css', {
      allChunks: true
    }),
    isoToolsPlugin
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        stage: 0
      }
    }, {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap!' +
        'sass?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    }, {
      test: /\.(otf|eot|svg|ttf|woff)/,
      loader: 'url?limit=100000'
    }, {
      test: isoToolsPlugin.regular_expression('images'),
      loader: 'url?limit=100000'
    }
  ]},
  sassLoader: {
    includePaths: [bourbonPath]
  },
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.json', '.coffee']
  }
}
