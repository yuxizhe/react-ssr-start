const webpack = require('webpack');
// const devConfig = require('../webpack.dev');
const devConfig = require('../webpack.config')[0];
const path = require('path')
const devServer = require('webpack-dev-server-speedy');
const HtmlWebpackPlugin = require('html-webpack-plugin')

devConfig['plugins'].push( new HtmlWebpackPlugin({template: './src/browser/index.html'}),)

var anotherClientConfig = {
  contentBase: path.resolve(__dirname, 'public'),
  hot: true,
  publicPath: '/',
  port: 3001,
  host: '0.0.0.0',
  disableHostCheck: true,
  // clientLogLevel: 'none',
  // Enable gzip compression of generated files.
  compress: true,
  // watchContentBase: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  },
  noInfo: true,
  // overlay: false,
  quiet: true,
  // By default files from `contentBase` will not trigger a page reload.
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/,
  }
};

var dev = {
  contentBase: path.resolve(__dirname, 'public'),
  hot: true,
  publicPath: '/',
  port: 3001,
  host: '0.0.0.0'
}

devServer.addDevServerEntrypoints(devConfig, anotherClientConfig);
const another = compile(devConfig);
// Create a new instance of Webpack-dev-server for our client assets.
// This will actually run on a different port than the users app.
const clientDevServer = new devServer(another, anotherClientConfig);

console.log('dev server listening on port 3001');
// Start Webpack-dev-server
clientDevServer.listen('3001','localhost', (err) => {
  
})

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.log('error')
    process.exit(1);
  }
  return compiler;
}
