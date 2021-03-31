import axios from 'axios';
import store from '@/store'
import { Notify, Dialog, Loading, Toast } from 'vant';
const service = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        sm4key: ciphertext,
      },
      timeout: 20000,
})
/**
 * 添加请求拦截，
 * 
 */
service.interceptors.request.use(config => {
    // 发送请求前的操作；
    return config;
})

service.interceptors.response.use((response) => {
    const res = response.data;
    // 获取返回结果，做一些全局的错误处理；

    return res;

}, (err) => {
    console.log(err);
    Dialog.alert({
        title: "提示",
        message: "网络请求异常，请稍后重试!"
    })
})

/***
 * 封装request 
 * @config {obj} 等同于axios配置参数  http://www.axios-js.com/zh-cn/docs/#axios-url-config
 * @options {obj} error：是否提示错误, loading:请求时是否显示loading;
 */

 export function request(config, options = {
    error: true,
    loading: true,
}) {
    let toastInstance;
    if (options.loading) {
        toastInstance = Toast();
        toastInstance.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
        });
    }
    return new Promise((reslove, reject) => {
        service(config).then(res => {
            reslove(res);
        }).catch(err => {
            if (options.error) {
                Notify({ type: 'danger', message: JSON.stringify(err) });
            }
            reject(reject);
        }).finally(() => {
            toastInstance.clear();
            toastInstance = null;
        })
    })
}