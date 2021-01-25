/*
 * @Author: dtdths
 * @Date: 2021-01-25 10:26:45
 * @LastEditTime: 2021-01-25 11:15:52
 * @FilePath: /taro-react-dva-template/config/index.js
 */
const path = require('path');
const taro_env = process.env.TARO_ENV || 'weapp'
const { H5_CUSTOM_ROUTES, BASENAME } = require('../src/config/config');

const config = {
  projectName: 'taro-react-dva-template',
  date: '2021-1-25',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${taro_env}`,
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
  sass: {
    resource: path.resolve(__dirname, '..', 'src/style/variable.weapp.scss'),
  },
  plugins: [],
  defineConstants: {
    // BASENAME: `'${BASENAME}'`,
    // H5_CUSTOM_ROUTES: JSON.stringify(H5_CUSTOM_ROUTES)
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[chunkhash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    router: {
      basename: BASENAME,
      mode: 'browser',
      customRoutes: H5_CUSTOM_ROUTES,
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
