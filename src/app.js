import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { taroEnv, pageNotFound } from './utils/tools';
import dva from './utils/dva';
import models from './models';
import './app.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

// H5页面添加监控代码
if (taroEnv === 'h5' && process.env.NODE_ENV === 'production') {
}

class App extends Component {
  componentWillMount() {
    pageNotFound();
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
