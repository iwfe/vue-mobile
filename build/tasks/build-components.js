/**
 * 打压缩包组件
 */

import fs from 'fs'
import fse from 'fs-extra'
import webpackConfig from '../webpack.config.components'
import { webpackTask } from './build-common'

fse.ensureDirSync(`${process.cwd()}/.tmp`)
const entry = {}
try {
  const components = fs.readdirSync(`${process.cwd()}/src/components`)
  components.forEach(item => {
    fse.outputFileSync(`${process.cwd()}/.tmp/${item}.js`, `
import ${item} from '../src/components/${item}/index.vue';
if (window.Vue) {
  window.Vue.component('Vm${item}', ${item});
}`
    )
    entry[item] = `./.tmp/${item}.js`
  })
} catch (e) {
  console.log(e)
}

webpackConfig.entry = entry
webpackTask(webpackConfig, () => {
  fse.removeSync(`${process.cwd()}/.tmp`)
})
