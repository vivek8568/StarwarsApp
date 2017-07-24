var path = require('path');
var webpack = require('webpack');

module.exports = {
 // This is for webpack-dev-server
//  entry: [
//    './src/index.js',
//    'webpack/hot/dev-server',
//    'webpack-dev-server/client?http://localhost:8080'
//  ],

 // This is for express server
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    publicPath : '/dist/',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    loaders:[
       {
           test : /\.js$/,
           loaders: ['babel-loader'],
           exclude : '/node_modules/'
       },
       {
           test : /\.(png|jpg|jpeg|gif)$/,
           loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
           exclude : '/node_modules/'
       },
       {
           test : /\.css$/,
           loaders: ['style-loader','css-loader?localIdentName=[path][name]---[local]'],
           exclude : '/node_modules/'
       }
    ]
  }
};