var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..','dist'),
    publicPath: './',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          // config in .babelrc
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
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
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
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
      }
    })
  ]);
} else {
  config.devtool = '#eval-source-map';
  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]);
  var devServerConfig = config.devServer = {
    contentBase: path.join(__dirname, '..'),
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
    'webpack-dev-server/client?http://' + devServerConfig.host + ':' + devServerConfig.port + '/',
    'webpack/hot/dev-server',
    originEntry
  ];
}
