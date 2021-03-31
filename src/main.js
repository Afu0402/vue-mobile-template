import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;


//引入jsbridge
import 'normalize.css/normalize.css' // A modern alternative to CSS resets http://necolas.github.io/normalize.css/

//添加Vant组件
import Vant from 'vant';
import { Notify } from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/index.less';
Vue.prototype.$notify = Notify;
Vue.use(Vant);

//引入通用的组件，css,js工具等
import '@/assets/init.css';
import '@/components/index.js';
import '@/common/global.js';

import store from './store'
import router from './route'



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
