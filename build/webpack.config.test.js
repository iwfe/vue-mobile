import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.dev'
delete baseConfig.plugins

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  // module: {
  //   rules: utils.styleLoaders()
  // },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"testing"'
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
