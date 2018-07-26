import Vue from 'vue'
import Router from 'vue-router'
import Routing from '../components/rout/Routing'
import App from '../App'
import Imgs from '../components/rout/Imgs'
import Color from '../components/rout/color'
import Chekuan from '../components/rout/chekuan'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'App',
      component:App
    },
    {
      path:'/routing',
      name:'Routing',
      component:Routing
    },
    {
      path:'/imgs',
      name:'Imgs',
      component:Imgs
    },
    {
      path:'/color',
      name:'Color',
      component:Color
    },
    {
      path:'/chekuan',
      name:'Chekuan',
      component:Chekuan
    }
  ]
})
