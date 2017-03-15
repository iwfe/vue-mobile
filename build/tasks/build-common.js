import webpack from 'webpack'

exports.webpackTask = function (webpackConf, buildEnv) {
  webpack(webpackConf, (err, stats) => {
    if (err) {
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      children: false
    }) + '\n\n')
  })
}
