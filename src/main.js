// =========================================================
// * Vuetify Material Dashboard - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licenses under MIT

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)

// Sync store with router
sync(store, router)

Vue.config.productionTip = false
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
