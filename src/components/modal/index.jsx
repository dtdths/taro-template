import React, { memo, useCallback, useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import ImageWrap from '@/components/imageWrap';
import { nextTick } from '@/utils/tools';
import './index.scss';

const positionClassNameMap = {
  top: 'top',
  bottom: 'bottom',
  center: 'center',
};

/**
 * 弹层
 * @param {*} props
 */
const Modal = (props = {}) => {
  const {
    children = null,
    isShow = false,
    hasBtn = true,
    className = '',
    position = 'center', // positionClassNameMap
    cancelText = '取消',
    confirmText = '确认',
    hasMask = true,
    title = '',
    hasClose = false,

    // destoryWhenClose = false,
    onCancel = () => {}, // 可回传关闭操作type = mask/close/cancel/ok
    onConfirm = null,
  } = props;

  const [_isShow, _setisShow] = useState(false);
  const [_isInHtml, _setisInHtml] = useState(false);

  const preventDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    let timer;
    if (isShow) {
      _setisInHtml(true);
      nextTick(() => {
        _setisShow(true);
      });
    } else {
      _setisShow(false);
      timer = setTimeout(() => {
        _setisInHtml(false);
      }, 600);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isShow]);

  if (!_isInHtml) {
    return null;
  }

  return (
    <View
      onClick={preventDefault}
      catchMove
      className={`cp-modal ${className} ${_isShow ? 'isShow' : ''}`}
    >
      {hasMask && (
        <View
          onClick={() => {
            onCancel('mask');
          }}
          className="modal-mask"
        />
      )}
      <View className={`modal-body safe-area-inset-bottom ${positionClassNameMap[position] || ''}`}>
        {/* 头部 */}
        {(!!title || hasClose) && (
          <View className="modal-header">
            {!!title && <Text className="title">{title}</Text>}
            {hasClose && (
              <ImageWrap
                onClick={() => {
                  onCancel('close');
                }}
                className="closeImg"
                src={require('@/static/imgs/close.svg')}
              />
            )}
          </View>
        )}
        {/* 内容 */}
        {children}
        {/* 按钮 */}
        {hasBtn && (
          <View className="btn-box">
            {!!cancelText && (
              <View
                onClick={() => {
                  onCancel('cancel');
                }}
                className="btn-cancel"
              >
                {cancelText}
              </View>
            )}
            {!!confirmText && (
              <View
                onClick={() => {
                  const _cb = onConfirm || onCancel;
                  _cb('ok');
                }}
                className="btn-confirm"
              >
                {confirmText}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(Modal);
