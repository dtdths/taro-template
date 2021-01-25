import Taro from '@tarojs/taro';
import { H5_CUSTOM_ROUTES } from '@/config/config';
// FEATURE: h5 bug,无法获得路由数据，且不支持 onPageNotFound , 3.0.18 可能修复
export default () => {
  const route = Taro.getCurrentInstance() || {};
  const config = route?.app?.config;
  const { pages = [], router = {} } = config || {};
  const currentPage = window.location.pathname.split(router.basename)[1];
  // /pages/comments/index
  // 通过自定义路由别名获得原始对应的路由
  const originRouteKey = Object.keys(H5_CUSTOM_ROUTES).find(
    (_originRouteKey) => H5_CUSTOM_ROUTES[_originRouteKey] === currentPage,
  );
  // 自定义路由不存在
  if (!originRouteKey) {
    const configRouteKey = (pages || []).find(
      (_configRouteKey) => `/${_configRouteKey}` === currentPage,
    );
    // 默认路由也不存在 或着 默认路由存在，而且默认路由对应的自定义路由存在（就是已配了自定义路由还跳原路由）
    if (!configRouteKey || (configRouteKey && H5_CUSTOM_ROUTES[`/${configRouteKey}`])) {
      Taro.redirectTo({
        url: '/index',
      });
    }
  }
};
