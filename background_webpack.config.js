const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src_background/main.js'),
  output: {
    path: path.join(__dirname, '/background'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader'
        ]
      },
      {test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader'},
      {
        test: /\.(png|jpe?j|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, ''),
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      templateContent: "<!DOCTYPE html><html lang=\"zh\"><title>喜小帮</title><head><meta charset=\"UTF-8\"></head><body><div id=\"app\"></div></body></html>",
      filename: 'index.html',
      inject: 'body'
    }),
    new VueLoaderPlugin(),
  ]
}
