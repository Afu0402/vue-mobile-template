
import Axios from 'axios';
import qs from 'qs'
import store from '@/store'
import { Notify } from 'vant';

const service = new Axios.create({
  baseURL: process.env.VUE_APP_SERVICE,
  timeout:9000,
  headers:{
      "Content-Type": "application/x-www-form-urlencoded"
  }
})


//请求拦截：在请求发送去之前添加token
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      const token = localStorage.getItem('token');
      config.headers['Authorization'] =`Bearer ${token}`;
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.transformResponse = (res) => {
  res = JSON.parse(res);
  return res;
}

//请求拦截：在接受到请求且准备返回给用户时判断date.code代码。触发相应的提示
//
service.interceptors.response.use(res => {
  const data = res.data;
  if(data.code !== 200) {
      Notify({ type: 'danger', message: data.msg });
  }
  if(res.state === 403) {
    Notify({ type: 'warning', message: '登录已过期，请重新登陆' });
    setTimeout(() => {
      store.dispatch('user/logout').then(res => {
        vm.$router.replace('/login')
      });
    },900)
    return Promise.reject('登陆已经过期...')
  } 
  return res;
}) 

function request(url, data, method = 'post', config = {},form) {
  $Log('api请求参数和URL',url,data)
  const defaultConf = {
    url: url,
    method: method,
    data:{},
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  if(form === 'formData') {
    defaultConf.data = qs.stringify(data);
    defaultConf.headers["Content-Type"] = "application/x-www-form-urlencoded";
  } else {
    defaultConf.data = JSON.stringify(data);
    defaultConf.headers["Content-Type"] = "application/json	";
  }
  return service(Object.assign(defaultConf, config))
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      Notify({ type: 'warning', message: '系统繁忙，请稍后再试~' });
      return Promise.reject(error);
    });
}
export let $requestFormData = (url, formData,method = 'post', config = {},form = 'formData') => request(url, formData,method, config,form);
export let $requestBody = (url, formData,method = 'post', config = {},form = 'body') => request(url, formData,method, config,form);