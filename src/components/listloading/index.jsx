import React, { memo } from 'react';
import { View } from '@tarojs/components';
import './index.scss';

/**
 * 列表底部loading
 */
const ListLoading = () => {
  return (
    <View className="cp-listLoading">
      <View className="cp-listLoading__ring"></View>
      <View className="cp-listLoading__ring"></View>
      <View className="cp-listLoading__ring"></View>
    </View>
  );
};

export default memo(ListLoading);
