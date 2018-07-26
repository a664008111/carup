// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from "vue-lazyload"
import Index from "./components/index"
import store from "./store"
import vueg from 'vueg'    
import 'vueg/css/transition-min.css'
Vue.config.productionTip = false

const options={  
  duration: '0.3',            
  firstEntryDisable: false,     
  firstEntryDuration: '.6',     
  forwardAnim: 'fadeInRight',   
  backAnim: 'fadeInLeft',       
  sameDepthDisable: false,     
  tabs: [{
          name:'home'
      },{
          name:'my'
      }],                       
  tabsDisable: false,           
  disable: false,                  
}  
Vue.use(lazyLoad,{
  error:"../static/imgs/shibai.png",
  loading:"../static/imgs/jiazais.gif"
})
Vue.use(vueg, router,options)

new Vue({
  el: '#app',
  router,
  store,
  components: { Index },
  template: '<Index/>'
})
