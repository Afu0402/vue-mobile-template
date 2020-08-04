import Vue from 'vue'
import App from './App.vue'
import store from './store'

//引入jsbridge
import "@/common/jsbridge.js";

import 'normalize.css/normalize.css' // A modern alternative to CSS resets http://necolas.github.io/normalize.css/

//添加Vant组件
import Vant from 'vant';
import { Notify } from 'vant';
Vue.prototype.$notify = Notify;
import 'vant/lib/index.css';
//引入全局自定义组件和工具
import '@/assets/init.css';
import '@/components/index.js';
import '@/common/global.js'

//添加路由
import VueRouter from 'vue-router';
import routes from '@/routes/index'
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach((to,form,next) => {
  if(to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  const hasToken = localStorage.getItem('token');
  next();
  // 根据token判断登录权限
  // if(hasToken) {
  //   if(to.path === '/login'){
  //     next({path:'/',replace:true})
  //   } else {
  //     next();
  //   }
  // } else {
  //   if(to.path === '/login') {
  //     next();
  //   } else {
  //     next({path:'/login',replace:true});
  //   } 
  // }
})

//解决IOS端键盘上移后不能回落的问题。
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);
document.body.addEventListener('focusout', () => {
  window.scrollTo(0,0);  
});


Vue.use(Vant);
Vue.config.productionTip = false

let vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

global.vm = vm;
