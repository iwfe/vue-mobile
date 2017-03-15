// 编译环境：test|beta|prod

export default {
  local: {
    // 需要用手机查看的时候改成 ip
    publicPath: 'http://localhost:8080/disH5/h5/'
  },
  test: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/iwagent-h5_test/'
  },
  beta: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/iwagent-h5_beta/'
  },
  prod: {
    publicPath: '//files.iwjw.com/resource/iwagent-h5/'
  }
}
