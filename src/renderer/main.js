import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import './assets/layui/css/layui.css'
import * as api from './utils/myTools'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$api = api
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' //解决控制台警告



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app')
