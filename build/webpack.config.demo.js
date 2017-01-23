var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, '../demo'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = '#source-map';
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]);
} else {
  config.devtool = '#eval-source-map';
  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
  var devServerConfig = config.devServer = {
    contentBase: path.join(__dirname, '..', 'demo'),
    colors: true,
    noInfo: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    inline: true,
    open: true
  };
  var originEntry = config.entry;
  config.entry = [
    'webpack-dev-server/client?http://' + devServerConfig.host + ':' + devServerConfig.ports + '/',
    'webpack/hot/dev-server',
    originEntry
  ];
}
