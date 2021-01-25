// eslint-disable-next-line import/no-commonjs
module.exports = {
  // 埋点id http://stream.jd.com/#/dashboard/joinup/site-list
  lOG_SITE_ID: 'JA2020_5513249', // 旧h5:'JA2018_5111217'
  // jd微信登录插件配置
  JD_WX_LOGIN_PLUGIN_CONFIG: {
    appid: 1353,
    requestHost: 'https://wxapplogin2.m.jd.com',
    version: '1.3.2',
    provider: 'wxefe655223916819e',
  },
  // 微信小程序设备指纹 bizKey
  BIZ_KEY: '2515b4f1dae9baffbcd0b5b01e47c29c690c99f1',
  // 微信小程序支付appid
  PAY_APPID: 'paipai_yx',
  // 微信小程序 mpSource 获取 open_id 用
  MP_SOURCE: 16,
  // 微信小程序 appid
  MP_APPID: 'wx4987f0b3b115aae2',
  // h5自定义路由
  H5_CUSTOM_ROUTES: {
    '/pages/service/index': '/service',
    '/pages/detail/index': '/detail',
    '/pages/comments/index': '/comments',
    '/pages/report/index': '/report',
    '/pages/paySuccess/index': '/paySuccess',
    '/pages/orderList/index': '/orderList',
    '/pages/404/index': '/404',
  },
  BASENAME: '/ppinspect',
};
