const webpack = require('webpack')
const devConfig = require('../webpack.config')[0]
const path = require('path')
const devServer = require('webpack-dev-server-speedy')
const HtmlWebpackPlugin = require('html-webpack-plugin')

devConfig.plugins.push(
  new HtmlWebpackPlugin({ template: './src/browser/index.html' })
)

var dev = {
  contentBase: path.resolve(__dirname, 'public'),
  hot: true,
  publicPath: 'http://0.0.0.0:3001/',
  port: 3001,
  host: '0.0.0.0',
  noInfo: true,
  quiet: true
}

devServer.addDevServerEntrypoints(devConfig, dev)

const another = compile(devConfig)

const clientDevServer = new devServer(another, dev)

// Start Webpack-dev-server
clientDevServer.listen('3001', 'localhost', err => {})

// Webpack compile in a try-catch
function compile(config) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.log('error')
    process.exit(1)
  }
  return compiler
}
