const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const express = require('express')
const cors = require('cors')
const devConfig = require('../webpack.config')[0]
// const path = require('path')
// const devServer = require('webpack-dev-server-speedy')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const app = express()

// 解决HMR 3000端口请求 3001 端口 跨域问题
app.use(cors())

// 代理
require('../middleware/proxy')(app)

devConfig.plugins.push(
  new HtmlWebpackPlugin({ template: './src/browser/index.html' })
)

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

const devCompiled = compile(devConfig)

// 如果使用 webpack-dev-server

// var dev = {
//   contentBase: path.resolve(__dirname, 'public'),
//   hot: true,
//   publicPath: 'http://0.0.0.0:3001/',
//   port: 3001,
//   host: '0.0.0.0',
//   noInfo: true,
//   quiet: true
// }

// devServer.addDevServerEntrypoints(devConfig, dev)
// const clientDevServer = new devServer(another, dev)

app.use(middleware(devCompiled, { logLevel: 'error' }))

app.use(require('webpack-hot-middleware')(devCompiled))

app.listen(3001, () => console.log('client listening on port 3001!'))
