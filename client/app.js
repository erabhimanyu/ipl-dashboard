import Vue from 'vue'
import App from './components/App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import 'common.css'

const app = new Vue({
  router,
  ...App
})

export { app, router }
