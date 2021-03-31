
import request from '@/common/request.js';
export const login = (data) => {
    return request({
        url:"/url",
        method:'post',
        data:data
    })
}