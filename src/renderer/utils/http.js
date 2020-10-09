import axios from 'axios'
import qs from 'qs'
import { msg } from './myTools'
import switchCode from './errorCode'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 10000,
    headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	transformRequest: function(data) {
		return qs.stringify(data);
	}
})

let loadIndex = null;
// 请求拦截器
service.interceptors.request.use(config => {
    loadIndex = layer.load(0,{offset: ['50%', '50%']})
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    layer.close(loadIndex)
    return response.data
}, error => {
    layer.close(loadIndex)
    if (error && error.response) {
        const message = switchCode(error.response.status)
        msg(message, 5)
    } else {
        if (JSON.stringify(error).includes('timeout')) {
            msg('服务器响应超时，请刷新当前页', 5)
        }
        msg('连接服务器失败', 5)
    }
    return Promise.resolve(error.response)
})
export default service