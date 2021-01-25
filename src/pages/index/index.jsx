import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import useSelectorWrap from '@/utils/hooks/useSelectorWrap';
import { pageEnvClsName } from '@/utils/tools';
import './index.scss';

const Index = () => {
  const dsipatch = useDispatch();

  const { data, loading } = useSelectorWrap((state) => {
    return {
      data: state.index.data,
      loading: state.loading.effects['index/fetch'],
    };
  });

  const asyncHandle = useCallback(async () => {
    await dsipatch({
      type: 'index/fetch',
      payload: {
        params: { key: 1 },
      },
    });
  }, [dsipatch]);

  useEffect(() => {
    if (loading) {
      Taro.showLoading({
        title: '加载中',
      });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);

  return (
    <View className={`page-detail ${pageEnvClsName}`}>
      <View>hello</View>

      <View onClick={asyncHandle}>异步操作</View>
      <View>{data.num}</View>
    </View>
  );
};

export default memo(Index);
