import Taro from '@tarojs/taro';
import { envType } from '@/utils/tools';
/**
 * 长按图片操作
 */

const saveImage = async (url) => {
  try {
    const res = await Taro.showModal({
      title: '提示',
      content: '保存图片到相册',
    });
    if (res.confirm) {
      const res2 = await Taro.getImageInfo({
        src: url,
      });
      await Taro.saveImageToPhotosAlbum({
        filePath: res2.path,
      });
      Taro.showToast({
        title: '保存成功',
        icon: 'success',
      });
    } else {
      throw res;
    }
  } catch (e) {
    Taro.showToast({
      title: '保存失败',
      icon: 'none',
    });
  }
};
// 用户拒绝权限后再次获取
const getAuthorizeReject = async () => {
  try {
    const res = await Taro.showModal({
      title: '提示',
      content: '保存图片功能需要您的授权',
    });
    if (res.confirm) {
      // 点击确认，打开权限页
      await Taro.openSetting();
    } else {
      throw res;
    }
  } catch (e) {
    Taro.showToast({
      title: '保存失败，请重试',
      icon: 'none',
      duration: 2000,
    });
  }
};
// 获取保存权限
const getAuthorize = async (url) => {
  if (envType !== Taro.ENV_TYPE.WEAPP) return;
  try {
    // 获得现有授权情况
    const res = await Taro.getSetting();
    // 未获权
    if (!res.authSetting['scope.writePhotosAlbum']) {
      await Taro.authorize({
        scope: 'scope.writePhotosAlbum',
      });
      await saveImage(url);
    } else {
      // 已授权
      await saveImage(url);
    }
  } catch (e) {
    if (e?.errMsg?.includes('authorize:fail')) {
      // 用户拒绝了授权，再次请求
      await getAuthorizeReject();
      return;
    }
    Taro.showToast({
      title: '保存失败，请重试',
      icon: 'none',
      duration: 2000,
    });
  }
};

export default getAuthorize;
