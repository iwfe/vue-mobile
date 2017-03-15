/**
 * 开发模式入口
 */

import path from 'path'
import express from 'express'
import ip from 'ip'
import chalk from 'chalk'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import httpProxyMiddleware from 'http-proxy-middleware'

import webpackConfig from '../webpack.config.dev'
import { proxyUrl } from '../config/mock-api'

// webpack-hot-middleware/client
const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']
const entry = webpackConfig.entry
Object.keys(entry).forEach((name) => {
  const value = entry[name]
  if (Array.isArray(value)) {
    value.unshift(...hotclient)
  } else {
    entry[name] = [...hotclient, value]
  }
})

const webpackCompiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(webpackCompiler, {
  // serverSideRender: true,
  publicPath: webpackCompiler.options.output.publicPath,
  noInfo: true,
  quiet: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    children: false
  }
})
const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
  log: false
})

const devServer = express()

// 所有 .do 结尾的请求都是页面请求，所以返回 index.html
// devServer.use(connectHistoryApiFallback({
//   rewrites: [
//     { from: /\.do$/, to: '/index.html'}
//   ],
//   verbose: false
// }))
devServer.use(devMiddleware)
devServer.use(hotMiddleware)
// 代理API，可以在config/mine.js中修改成你想要的代理目标
devServer.use(httpProxyMiddleware('**/*.rest', {
  logLevel: 'silent',
  target: proxyUrl,
  changeOrigin: true
}))

devServer.listen(8080, function () {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(`dev-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}`)}`)
})
