var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

process.env.NODE_ENV = 'development';
new webpackDevServer(webpack(require('./webpack.config.demo')), {
  hot: true,
  inline: true,
  open: true,
  stats: { colors: true }
});
