const cwd = process.cwd()

export default {
  'vue$': 'vue/dist/vue.common.js',
  src: `${cwd}/src/`,  // 源码目录
  global: `${cwd}/src/global`, // 全局目录

  utils: `${cwd}/src/global/utils`, // 工具
  bridge: `${cwd}/src/global/bridge`, // 与原生交互桥
  iwjw: `${cwd}/src/global/iwjw`, // 通用适配
}
