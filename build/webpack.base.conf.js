var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      
      // 'src': path.resolve(__dirname, '../src'),
      // 'assets': path.resolve(__dirname, '../src/assets'),
      // 'components': path.resolve(__dirname, '../src/components'),
      // 'views': path.resolve(__dirname, '../src/views'),
      // 'styles': path.resolve(__dirname, '../src/styles'),
      // 'api': path.resolve(__dirname, '../src/api'),
      // 'utils': path.resolve(__dirname, '../src/utils'),
      // 'store': path.resolve(__dirname, '../src/store'),
      // 'router': path.resolve(__dirname, '../src/router'),
      // 'mock': path.resolve(__dirname, '../src/mock'),
      // 'vendor': path.resolve(__dirname, '../src/vendor'),
      // 'static': path.resolve(__dirname, '../static'),
      // 'config': path.resolve(__dirname, '../src/config')

      'vue$': 'vue/dist/vue.esm.js',

        '@'         : path.resolve('src'),
        'assets'   : path.resolve('src/assets'),
        'cps'   : path.resolve('src/components'),
        'views'   : path.resolve('src/views'),
        'layout'   : path.resolve('src/layout'),
        'config'   : path.resolve('src/config'),
        'utils'   : path.resolve('src/utils'),
        'store'   : path.resolve('src/store'),
        'directives'   : path.resolve('src/directives'),
        'filters'   : path.resolve('src/filters'),
        'mixins'   : path.resolve('src/mixins'),
        'plugins'   : path.resolve('src/plugins'),
        'register'   : path.resolve('src/register'),
        'libs'   : path.resolve('src/libs'),
        'apis'   : path.resolve('src/apis'),
        'router'   : path.resolve('src/router'),
    }
  },
  module: {
    rules: [
      // {
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     enforce: "pre",
      //     include: [resolve('src'), resolve('test')],
      //     options: {
      //         formatter: require('eslint-friendly-formatter')
      //     }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  //注入全局mixin
  // sassResources: path.join(__dirname, '../src/styles/mixin.scss'),
  // sassLoader: {
  //     data:  path.join(__dirname, '../src/styles/index.scss')
  // },
}

