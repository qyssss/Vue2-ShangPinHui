import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册为全局组件 全局组件放在 components 
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由 用小写,组件获得 $router,$route
  router,
  // 注册仓库,组件实例身上会多一个 store 属性
  store,
}).$mount('#app')
