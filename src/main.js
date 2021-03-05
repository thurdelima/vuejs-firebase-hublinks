import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/css/tailwind.css";
import Skeleton from 'vue-loading-skeleton';
import Notifications from 'vue-notification'

Vue.use(Skeleton);
Vue.use(Notifications)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
