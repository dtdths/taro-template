import Taro from '@tarojs/taro';

export default () => {
  Taro.onPageNotFound((e) => {
    console.log(e);
    Taro.redirectTo({
      url: '/pages/index/index',
    });
  });
};
