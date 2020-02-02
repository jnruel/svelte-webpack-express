const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: ['./src/main.js']
  },
  output: {
    // path: __dirname + '/public',
    // filename: '[name].js',
    // chunkFilename: '[name].[id].js',
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            // emitCss: true,
            hotReload: true
            // preprocess: require('svelte-preprocess')([
            // 	scss()
            // ])
          }
        }
      }
    ]
  }
};
