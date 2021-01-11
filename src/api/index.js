// 封装 axios

import axios from 'axios'
import { Component } from "react";
// 配置请求根路径
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

// 请求拦截器,携带 token
axios.interceptors.request.use(config => {
  // 获取 token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Component.prototype.$http = axios
