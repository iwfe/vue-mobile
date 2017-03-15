/**
 * 打压缩包 test beta prod
 */

import inquirer from 'inquirer'
import chalk from 'chalk'

import webpackConfig from '../webpack.config.prod'
import envConfig from '../config/env'

import { webpackTask } from './build-common'


const compile = (buildEnv) => {
  // 更改对应环境的 publicPath
  webpackConfig.output.publicPath = envConfig[buildEnv].publicPath

  return Promise.resolve()
    .then(() => webpackTask(webpackConfig, buildEnv))
    .catch((err) => {
      console.log(chalk.red('Compiler encountered an error.'), err)
      process.exit(1)
    })
}


// 选择 编译环境
inquirer.prompt({
  type: 'list',
  name: 'env',
  message: '\n\n选择编译到哪个环境?',
  choices: ['test', 'beta', 'prod'],
  default: ['test']
}).then((res) => {
  compile(res.env)
})
