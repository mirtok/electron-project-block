const switchCode = (status) => {
    let message = "";
    switch (status) {
        case 400:
            message = '错误请求'
            break;
        case 401:
            message = '未授权，请重新登录'
            break;
        case 403:
            message = '拒绝访问'
            break;
        case 404:
            error.message = '请求错误,未找到该资源'
            window.location.href = "/NotFound"
            break;
        case 405:
            message = '请求方法未允许'
            break;
        case 408:
            message = '请求超时'
            break;
        case 500:
            message = '服务器端出错'
            break;
        case 501:
            message = '网络未实现'
            break;
        case 502:
            message = '网络错误'
            break;
        case 503:
            message = '服务不可用'
            break;
        case 504:
            message = '网络超时'
            break;
        case 505:
            message = 'http版本不支持该请求'
            break;
        default:
            message = `连接错误${error.response.status}`
    }
    return message;
}
export default switchCode