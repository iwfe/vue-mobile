/**
 * 打压缩包 prod
 */

import webpackConfig from '../webpack.config.prod'
import { webpackTask } from './build-common'

webpackTask(webpackConfig)
