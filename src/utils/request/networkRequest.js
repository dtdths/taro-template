import Taro from '@tarojs/taro';

export default (config) => {
  // 创建返回的 promise 对相关
  let _resolve,
    _reject,
    _promise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  Taro.request(config)
    .then((res) => {
      _resolve({ response: res, apiConfig: config });
    })
    .catch((err) => {
      _reject({ error: err, apiConfig: config });
    });
  return _promise;
};
