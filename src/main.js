import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册为全局组件 全局组件放在 components 
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false
// 引入mockServe.js 进行mock数据
import '@/mock/mockServe.js'
// 引入swiper样式(放在这里可以全局使用)
import 'swiper/css/swiper.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由 用小写,组件获得 $router,$route
  router,
  // 注册仓库,组件实例身上会多一个 store 属性
  store,
}).$mount('#app')
