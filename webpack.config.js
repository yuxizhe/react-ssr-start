var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [{ test: /\.(js)$/, use: 'babel-loader' }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{ test: /\.(js)$/, use: 'babel-loader' }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    }),
    // Prevent creating multiple chunks for the server
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}

module.exports = [browserConfig, serverConfig]
