import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import Taro, { usePageScroll } from '@tarojs/taro';
import { throttle } from 'lodash';
import { View } from '@tarojs/components';
import './index.scss';

/**
 * 回到顶部
 * @param {*} props
 */
const BackTop = (props = {}) => {
  const {
    onClick = () => {}, // 点击事件，如埋点
    onChange = () => {}, // isShow change时触发
  } = props;

  const [isShow, setIsShow] = useState(false);
  const showHightRef = useRef(0);

  const clickHandler = useCallback(() => {
    Taro.pageScrollTo({
      scrollTop: '0',
      duration: 150,
      complete: onClick,
    });
  }, [onClick]);

  usePageScroll(
    throttle((res) => {
      setIsShow(showHightRef.current && res.scrollTop > showHightRef.current);
    }, 500),
  );

  useEffect(() => {
    const { windowHeight = 0 } = Taro.getSystemInfoSync();
    // 超过1屏显示
    showHightRef.current = windowHeight;
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(isShow);
    }
  }, [isShow, onChange]);

  return <View onClick={clickHandler} className={`cp-backTop ${isShow ? 'isShow' : ''}`} />;
};

export default memo(BackTop);
