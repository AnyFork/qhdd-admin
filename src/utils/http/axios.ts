import axios from 'axios';
import { getToken } from '@/utils'
//get请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//允许跨域携带cookie信息
axios.defaults.withCredentials = true
//设置超时
axios.defaults.timeout = 15000
// 设置请求baseURL
axios.defaults.baseURL = '/apis'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config)
    // 添加请求头部token
    const token = getToken()
    if (token && config.headers) {
        const tokenObj = JSON.parse(token)
        config.headers[tokenObj.tokenName] = tokenObj.tokenValue
    }
    return config;
}, function (error) {
    console.log("请求异常", JSON.stringify(error))
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.status == 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, function (error) {
    console.log("响应结果异常", JSON.stringify(error))
    return Promise.reject(error);
});

export { axios }