import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { fixJFSImageURL } from '@/utils/tools';
import ImageWrap from '@/components/imageWrap';

import './index.scss';

/**
 * 无数据托底
 * @param {*} props
 */
const NoData = (props = {}) => {
  const {
    img = fixJFSImageURL({
      url: 'jfs/t1/170960/31/3738/9322/600a4187Eec1094d7/a1a33ba707de9f95.png',
      width: null,
      height: null,
    }),
    text = '暂无商品',
  } = props;

  return (
    <View className="cp-noData">
      <View className="noData-imgBox">
        <ImageWrap src={img} className="noData-img" />
      </View>
      <View className="noData-text">{text}</View>
    </View>
  );
};

export default memo(NoData);
