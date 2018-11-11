const path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules:[{
      test: /\.(scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        { loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      ko: 'knockout',
      Popper: ['popper.js', 'default']
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './src/template.html',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
