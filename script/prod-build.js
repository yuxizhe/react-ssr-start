const webpack = require('webpack')
const browserConfig = require('../webpack.prod')[0]
const serverConfig = require('../webpack.prod')[1]

const clientCompiler = compile(browserConfig)
const serverCompiler = compile(serverConfig)

clientCompiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  serverCompiler.run((err, stats) => {
    if (err) {
      console.error(err)
      return
    }
  })
})

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
