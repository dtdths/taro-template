const { pages, subpackages } = (() => {
  // 添加h5页面时需在 ./config/config.js 里配置 H5_CUSTOM_ROUTES
  const _pages = ['pages/index/index'];
  const _subpackages = [];
  switch (process.env.TARO_ENV) {
    case 'weapp':
      return {
        pages: [..._pages],
        subpackages: [..._subpackages],
      };
    default:
      return {
        pages: [..._pages],
        subpackages: [..._subpackages],
      };
  }
})();

export default {
  pages,
  subpackages,
  // plugins: {
  //   loginPlugin: {
  //     version: JD_WX_LOGIN_PLUGIN_CONFIG.version,
  //     provider: JD_WX_LOGIN_PLUGIN_CONFIG.provider,
  //   },
  // },
  window: {
    backgroundTextStyle: 'dark',
    backgroundColor: '#f7f7f7',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'template',
    navigationBarTextStyle: 'black',
  },
};
