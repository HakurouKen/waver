var webpack = require('webpack');

process.env.NODE_ENV = 'production';
webpack(require('./webpack.config.demo'), function (err, stats) {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
})
