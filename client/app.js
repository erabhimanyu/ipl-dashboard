import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import 'common.css'

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
