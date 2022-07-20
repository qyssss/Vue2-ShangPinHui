import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册为全局组件 全局组件放在 components 
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false
// 引入mockServe.js 进行mock数据
import '@/mock/mockServe.js'
// 引入swiper样式(放在这里可以全局使用)
import 'swiper/css/swiper.css'
new Vue({
  render: h => h(App),
  // 注册路由 用小写,组件获得 $router,$route
  router,
  // 注册仓库,组件实例身上会多一个 store 属性
  store,
}).$mount('#app')
