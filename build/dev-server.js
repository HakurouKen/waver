var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.demo');
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn');

process.env.NODE_ENV = 'development';
var devServerConfig = webpackConfig.devServer || {};
var server = new WebpackDevServer(webpack(webpackConfig), {
  noInfo: true,
  contentBase: devServerConfig.contentBase,
  hot: devServerConfig.hot,
  inline: devServerConfig.inline,
  stats: { colors: true }
});

var host = devServerConfig.host || 'localhost',
  port = devServerConfig.port || 8080,
  url = 'http://' + host + ':' + port;
server.listen(port, host, function () {
  console.log('Serving on ' + url);
  if (devServerConfig.open) {
    opn(url);
  }
});
