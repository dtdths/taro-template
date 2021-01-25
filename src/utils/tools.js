import Taro from '@tarojs/taro';

export const envType = Taro.getEnv();

export const taroEnv = process.env.TARO_ENV;

// FEATURE: v3.0.16 Taro.nextTick 不支持 h5
export const nextTick = (fn) =>
  envType === Taro.ENV_TYPE.WEAPP ? Taro.nextTick(fn) : window.requestAnimationFrame(fn);

/**
 * 获得设备类型 1：安卓 ; 2：IOS
 * @returns {number} 1 2
 */
export const devicesType = (() => {
  // if (taroEnv === 'h5') {
  //   return getDeviceType();
  // }
  const res = Taro.getSystemInfoSync();
  return /IOS/.test(res.platform.toUpperCase()) ? 2 : 1;
})();

// /**
//  * 根据环境添加的页面 className
//  */
// export const pageEnvClsName = (() => {
//   // const device = { 1: 'andr', 2: 'ios' }[devicesType] || 'ios';
//   // return `${device} ${h5Env}`;
//   return '';
// })();
export const pageEnvClsName = '';

export const pageNotFound = (() => require('./envUtils/pageNotFound').default)();

/**
 * @description 保存图片
 */
export const wxSaveImg = (() => {
  if (taroEnv === 'weapp') {
    return require('./envUtils/saveImg.weapp').default;
  }
  return () => {};
})();

/**
 * timeout 毫秒后执行
 * @param {*} timeout
 */
export const sleep = (timeout) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
// sleep.cancel clearTimeout

/**
 * 格式化价格，保留两位小数后以 “.“ 分割
 * @param {*} price
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return [];
  try {
    let _price = Number.parseFloat(price, 10);
    _price = _price > 0 ? _price : 0;
    return _price.toFixed(2).split('.');
  } catch (e) {
    console.log(e);
  }
  return [];
};

/**
 * 将对象里的key重命名或删除
 * @param {*} params 对象
 * @param {*} renameObj { '现有key': '重命名key' }
 */
export const reNameObjKey = (params = {}, renameObj) => {
  if (!renameObj) {
    return params;
  }
  try {
    const _rKey = Object.keys(renameObj);
    return Object.keys(params).reduce((pv, cv) => {
      let newPv = { ...pv };
      if (_rKey.includes(cv)) {
        if (renameObj[cv]) {
          // 存在则重命名，不存在则不填入
          newPv[renameObj[cv]] = params[cv];
        }
      } else {
        newPv[cv] = params[cv];
      }
      return newPv;
    }, {});
  } catch (e) {
    console.log(e);
  }
  return params;
};

/**
 * 获取uuid
 * @returns {string}
 */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0; // eslint-disable-line
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line
    return v.toString(16);
  });

/**
 * formatTime 时间格式化
 * @author siyunke
 */
export const formatTime = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(Number(date));
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw Error('时间格式错误' + date);
  }
  const o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    'N+': date.getHours() < 12 ? 'am' : 'pm', //ampm
    S: date.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return format;
};
/**
 * 对象拼接为url参数格式
 * @param {*} obj
 */
export const obj2UrlParams = (obj = {}) => {
  if (!obj) return '';
  return Object.keys(obj)
    .reduce((pv, cv) => [...pv, `${cv}=${obj[cv] || ''}`], [])
    .join('&');
};

/**
 * rpx 转 px, 四舍五入
 * @param {*} rpx
 */
export const rpx2px = (() => {
  const { windowWidth } = Taro.getSystemInfoSync();
  return (rpx = 0) => Math.round((rpx / 750) * windowWidth);
})();

/**
 * 获取元素位置信息
 * @param {*} selector
 */
export const getRect = (selector, _nextTick = false) => {
  let _resolve;
  let _reject;
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  const func = () => {
    Taro.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .exec((res) => {
        if (res[0]) {
          _resolve(res[0]);
        } else {
          _reject();
        }
      });
  };
  _nextTick ? Taro.nextTick(func) : func();
  return promise;
};

/**
 * 等元素已经在页面上的 promise
 * @param {*} selecotr
 */
export const waitElementExist = (selecotr) => {
  let _resolve, _reject;
  const _promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  function exec() {
    getRect(selecotr)
      .then((res) => {
        _resolve(res);
      })
      .catch(() => {
        Taro.nextTick(() => {
          exec();
        });
      });
  }
  exec();
  return _promise;
};
