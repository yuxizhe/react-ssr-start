const webpack = require('webpack');
const browserConfig = require('../webpack.config')[0];
const serverConfig = require('../webpack.config')[1];

const clientCompiler = compile(browserConfig);
const serverCompiler = compile(serverConfig);




clientCompiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  serverCompiler.watch({

  },(err, stats) => {
  })
})

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    debugger
    console.log('error')
    process.exit(1);
  }
  return compiler;
}
