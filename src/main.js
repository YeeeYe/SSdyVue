import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//手机适配
import 'lib-flexible'
Vue.config.productionTip = false
import '../lib/mui/css/mui.css'
import '../lib/mui/css/icons-extra.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);
Vue.use(Mint);
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.filter('ellipsis',function (value, num) {
  if (!value) return ''
  if (value.length > num) {
    return value.slice(0, num) + '...'
  }
  return value
})
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
