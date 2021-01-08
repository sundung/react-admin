import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// 导入 重置样式
import './assets/styles/reset.css'
// 导入 全局样式
import './assets/styles/global.css'
//导入 axios
import './api/index.js'
ReactDOM.render(

  <App />, document.getElementById('root')
);


