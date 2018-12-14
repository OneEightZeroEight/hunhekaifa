import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Plus from '@/pages/Plus'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:newsId',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/plus',
      name: 'Plus',
      component: Plus
    }
  ]
})
