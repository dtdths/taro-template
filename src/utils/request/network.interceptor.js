/**
 * 网络请求拦截器管理类
 */
export default class NetworkInterceptorManager {
  constructor() {
    // 拦截器中的处理器集合
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use = (fulfilled, rejected) => {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
    });
    return (this.handlers.length = 1);
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  remove = (id) => {
    if (this.handlers[id]) {
      this.handlers.splice(id, 1);
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * @param {Function} fn The function to call for each interceptor
   */
  forEach = (fn) => {
    this.handlers.forEach((handler) => {
      fn(handler);
    });
  };
}
