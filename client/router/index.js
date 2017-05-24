import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Teams from '../views/Teams'
import TeamPage from '../views/TeamPage'
import WhoseParadise from '../views/WhoseParadise'
import About from '../views/About'
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
      component: Teams,
    },
    {
      path: '/team/:teamName',
      component: TeamPage
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/paradise',
      component: WhoseParadise
    },
    {
       path: '*', 
       component: FourOFour
    }
  ]
})
