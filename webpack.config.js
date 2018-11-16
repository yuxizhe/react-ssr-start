var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WebpackBar = require('webpackbar')

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  // mode: 'development',
  module: {
    rules: [{ 
      test: /\.(js)$/, 
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader' 
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new CleanWebpackPlugin(['public']),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    }),
    new WebpackBar({
      color: '#f56be2',
      name: 'client',
    }),
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  // mode: 'development',
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{ 
      test: /\.(js)$/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    }),
    // Prevent creating multiple chunks for the server
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new WebpackBar({
      color: '#c065f4',
      name: 'server',
    }),
  ]
}

module.exports = [browserConfig, serverConfig]
