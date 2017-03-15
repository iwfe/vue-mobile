/**
 * 静态文件打包压缩，server 使用本地 api 接口
 */
import path from 'path'
import express from 'express'
import ip from 'ip'
import httpProxyMiddleware from 'http-proxy-middleware'
import chalk from 'chalk'

import { proxyUrl } from '../config/mock-api'
import { webpackTask } from './build-common'
import webpackConfig from '../webpack.config.prod'

const devServer = express()
devServer.use('/disH5/h5/', express.static('./dist'))

// 代理API，可以在config/mine.js中修改成你想要的代理目标
devServer.use(httpProxyMiddleware('**/*.rest', {
  logLevel: 'silent',
  target: proxyUrl,
  changeOrigin: true
}))

// devServer.get('*.do', (req, res) => {
//   res.sendFile(path.resolve('dist/index.html'))
// })

devServer.listen(8080, function () {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(`dev-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}`)}`)

  // webpack 部分
  webpackConfig.plugins.pop()
  webpackConfig.watch = true
  webpackTask(webpackConfig)
})
