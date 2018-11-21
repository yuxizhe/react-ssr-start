const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

var browserConfig = {
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    './src/browser/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3001/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    // HMR
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['public']),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'vender.css',
      chunkFilename: '[name].css'
    }),
    new WebpackBar({
      color: '#f56be2',
      name: 'client'
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: 'http://localhost:3001/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ]
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
      color: 'green',
      name: 'server'
    })
  ]
}

module.exports = [browserConfig, serverConfig]
