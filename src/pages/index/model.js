// import Taro from '@tarojs/taro';
// import {
//   requestDetailParams,
// } from '@/services/prodect';
const requestIndexData = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  });
};

const takeLatest = {
  type: 'takeLatest',
};

const initState = {
  data: {
    num: 1,
  },
};

export default {
  namespace: 'index',
  state: JSON.parse(JSON.stringify(initState)),
  effects: {
    fetch: [
      function* ({ payload = {} }, { call, put, select, take, all }) {
        const currentNum = yield select((_state) => _state.index.data.num);
        let data = {};
        try {
          const { params } = payload || {};
          const res = yield call(requestIndexData, {
            data: params,
            // ...{ autoShowError: !payload._hideError },
          });
          data = res || {};
          data.num = currentNum + 1;
          // 保存数据
        } catch (ex) {
          console.log(ex);
        }
        yield all([
          put({
            type: 'save',
            payload: {
              data,
            },
          }),
        ]);
        return data;
      },
      takeLatest,
    ],
    // /**
    //  * @description 通过url参数加载页面数据, 初始入口
    //  * @param {*} { payload = {} }
    //  * @param {*} { call, put, select }
    //  */
    // *loadPageDateFromUrlParams({ payload = {} }, { call, put, all, select, take }) {
    //   const {
    //     scene, // 扫码获得 md5 加密参数
    //     inspectSkuId, // 优品skuId
    //     youpinSkuId, // 质检skuId
    //     channelCode, // 渠道码
    //     employeeId, // 员工ID
    //   } = payload || {};
    //   let params = { inspectSkuId, youpinSkuId, channelCode, employeeId };
    //   yield put({
    //     type: 'saveLoading',
    //     payload: true,
    //   });
    //   // 从小程序码中获得原始参数
    //   if (scene) {
    //     params = yield put.resolve({
    //       type: 'getDetailParams',
    //       payload: {
    //         body: {
    //           md5key: scene,
    //         },
    //       },
    //     });
    //   }
    //   if (!params?.youpinSkuId) {
    //     yield put({
    //       type: 'saveLoading',
    //       payload: false,
    //     });
    //     // 如果有scene，使用scene的报错
    //     if (!scene) {
    //       Taro.showToast({
    //         icon: 'none',
    //         title: '商品不小心走丢啦，请稍后再试',
    //       });
    //     }
    //     return;
    //   }
    //   // 以下情况为存在 youpinSkuId
    //   // 历史参数入栈
    //   yield put.resolve({
    //     type: 'changeDetailParamsHistory',
    //     payload: {
    //       type: 'unshift',
    //       payload: params,
    //     },
    //   });
    //   yield put({
    //     type: 'loadPageDateByParamsHistoryFirstItem',
    //   });
    // },
    // /**
    //  * 商详基础信息
    //  * @param {*} param0
    //  * @param {*} param1
    //  */
    // getDetailBase: [
    //   function* e({ payload = {} }, { call, put, select, take, all }) {
    //     let detailBaseData = {};
    //     try {
    //       const { body } = payload || {};
    //       const res = yield call(requestDetailBase, {
    //         data: { body },
    //         ...{ autoShowError: !payload._hideError },
    //       });
    //       detailBaseData = res?.result || {};
    //       // 保存数据
    //     } catch (ex) {
    //       console.log(ex);
    //     }
    //     yield all([
    //       put({
    //         type: 'save',
    //         payload: {
    //           detailBaseData,
    //         },
    //       }),
    //       put({
    //         type: 'saveLoading',
    //         payload: false,
    //       }),
    //     ]);
    //     return detailBaseData;
    //   },
    //   takeLatest,
    // ],
    // // 监听 inspectSkuId 与 推荐列表变化, 需根据主接口返回的 inspectSkuId 手动过滤当前商品
    // addWatcherRecommendList: [
    //   function* ({ call, put, select, take, all }) {
    //     while (true) {
    //       // const res = yield all([take(['getDetailBase/@@end']), take(['getRecommedList/@@end'])]);
    //       const res = yield all([
    //         take(['changeDetailParamsHistory/@@end']),
    //         take(['addWatcherRecommendList']),
    //       ]);
    //       const paramsHistoryFirstItem = yield select(
    //         (_state) => _state.detail.detailParamsHistory[0],
    //       );
    //       const { recommedList = [] } = res[1].payload;
    //       const inspectSkuId = paramsHistoryFirstItem.inspectSkuId || '';
    //       if (inspectSkuId) {
    //         recommedList = recommedList
    //           .filter((item) => String(item.inspectSkuId) !== String(inspectSkuId))
    //           .slice(0, 20);
    //       }
    //       // console.log(paramsHistoryFirstItem, res[1].payload.recommedList);
    //       yield put({
    //         type: 'save',
    //         payload: {
    //           recommedList,
    //         },
    //       });
    //     }
    //   },
    //   { type: 'watcher' },
    // ],
    // /**
    //  * 添加/删除 detailParamsHistory 最多20条
    //  * @param {*} param0
    //  * @param {*} param1
    //  */
    // *changeDetailParamsHistory({ payload = {} }, { call, put, select, take, all }) {
    //   const maxLength = 20;
    //   const detailParamsHistory = yield select((state) => state.detail.detailParamsHistory);
    //   const changeType = payload?.type || null;
    //   let _detailParamsHistory = [...detailParamsHistory];
    //   let change = {
    //     // 改变的内容
    //     type: changeType,
    //     payload: null,
    //   };
    //   // 增
    //   if (changeType === 'unshift' && payload?.payload) {
    //     change = {
    //       type: changeType,
    //       payload: payload.payload,
    //     };
    //     _detailParamsHistory = [payload.payload, ..._detailParamsHistory];
    //     // 最多20条
    //     if (_detailParamsHistory.length > maxLength) {
    //       _detailParamsHistory.length = maxLength;
    //     }
    //   } else if (changeType === 'shift' && _detailParamsHistory.length > 1) {
    //     // 删
    //     change = {
    //       type: changeType,
    //       payload: _detailParamsHistory.shift(),
    //     };
    //   } else if (changeType === 'updateCurrent') {
    //     // 改
    //     change = {
    //       type: changeType,
    //       payload: payload.payload,
    //     };
    //     _detailParamsHistory[0] = { ..._detailParamsHistory[0], ...payload.payload };
    //   }
    //   yield put.resolve({
    //     type: 'save',
    //     payload: {
    //       detailParamsHistory: _detailParamsHistory,
    //     },
    //   });
    //   console.log('changeDetailParamsHistory', _detailParamsHistory);
    //   return {
    //     change,
    //     detailParamsHistory: _detailParamsHistory,
    //   };
    // },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    resetState() {
      return JSON.parse(JSON.stringify(initState));
    },
  },
};
