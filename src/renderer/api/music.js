import service from '@/utils/http'

const musicHeader = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
}

/**
 * 获取音乐
 * @param {Object} params 
 */
export const getMusic = (params) =>{
    return service({
        url: 'http://www.lxit365.com/api/tools/music/',
        method: 'POST',
        data: params,
        headers: musicHeader
    })
}