import { mergeWith } from 'lodash';
import NetworkInterceptorManager from './network.interceptor';

/**
 * 网络请求类
 * @param {*} instanceConfig
 */
class Network {
  constructor(instanceConfig, networkRequest) {
    this.defaultConfig = instanceConfig;
    this.networkRequest = networkRequest;
    this.interceptors = {
      request: new NetworkInterceptorManager(),
      response: new NetworkInterceptorManager(),
    };
  }
  request = (config) => {
    // 初始化请求配置
    let _config = mergeWith({}, this.defaultConfig, config);

    // 创建拦截器队列
    let _chain = [this.networkRequest, undefined];

    // 初始化拦截器延迟对象
    let _promise = Promise.resolve(_config);

    // 将请求拦截器按照添加顺序的倒序前置到拦截器队列的前端
    this.interceptors.request.forEach((handler) => {
      _chain.unshift(handler.fulfilled, handler.rejected);
    });

    // 将响应拦截器按照添加顺序的后置到拦截器队列的后端
    this.interceptors.response.forEach((handler) => {
      _chain.push(handler.fulfilled, handler.rejected);
    });

    // 将拦截器队列串到一起
    while (_chain.length) {
      _promise = _promise.then(_chain.shift(), _chain.shift());
    }
    return _promise;
  };
}

export default Network;
