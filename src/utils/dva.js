import { create } from 'dva-core';
// import { createLogger } from "redux-logger";
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;
let registered;

function createApp(opt) {
  // // redux 日志
  // if (process.env.NODE_ENV === "development") {
  //   opt.onAction = [createLogger()];
  // }
  app = create(opt);
  app.use(createLoading({}));

  // 注册 model
  if (!registered) {
    opt.models.forEach((model) => app.model(model));
    registered = true;
  }

  app.start();
  store = app._store;
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
