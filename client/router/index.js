import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import FourOFour from '../views/FourOhFour'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/team',
      component: Home
    },
    {
      path: '/about',
      component: Home
    },
    {
      path: '/paradise',
      component: Home
    },
    {
       path: '*', 
       component: FourOFour
    }
  ]
})
