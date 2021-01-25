import { shallowEqual, useSelector } from 'react-redux';

// 包装 useSelector
export default (selector) => useSelector(selector, shallowEqual);
