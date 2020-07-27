import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import MSAL1 from './components/MSAL1.vue'
import MSAL2 from './components/MSAL2.vue'

const routes = [
  { path: '/msal1', component: MSAL1 },
  { path: '/msal2', component: MSAL2 }
]

const router = new VueRouter({routes})

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
