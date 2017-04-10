import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import EslintFriendlyFormatter from 'eslint-friendly-formatter'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'

import ManifestPlugin from './plugins/manifest.js'
import { cssLoaders, styleLoaders } from './utils'
import { entry, alias, provide } from './config'
import pkg from '../package.json'

export default {
  entry,
  devtool: false,
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin(provide),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      chunks: ['common', 'app'],
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    // 删除 dist 和 zip 目录然后重新建空目录
    new CleanWebpackPlugin(['dist'], { root: `${process.cwd()}` }),
  ],
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: EslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: cssLoaders({
            sourceMap: false,
            extract: true
          }),
          postcss: [
            autoprefixer({ browsers: ['last 2 versions'] })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      ...(styleLoaders({
        sourceMap: false,
        extract: true
      })),
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
