import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册为全局组件 全局组件放在 components 
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// element-ui 按需引入使用
import { Button, Icon, MessageBox } from 'element-ui'
// 注册全局组件
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
// 另一种注册方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false
// 引入mockServe.js 进行mock数据
import '@/mock/mockServe.js'
// 引入swiper样式(放在这里可以全局使用)
import 'swiper/css/swiper.css'

// 统一接收 api 文件夹里面的全部请求函数 
// 统一引入 这个对象包含所有 api
import * as API from '@/api'
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由 用小写,组件获得 $router,$route
  router,
  // 注册仓库,组件实例身上会多一个 store 属性
  store,
}).$mount('#app')
