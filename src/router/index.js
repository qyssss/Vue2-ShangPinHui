// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'

// 把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写 push 和 replace方法,解决点击编程式路由导航多次会报错的问题
// 第1个参数是告诉原来push方法往哪跳转和参数,加上2个回调函数防止报错(因为Promise要求的)
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 把 this 指向改为 VueRouter 的实例,因为原本方法调用者就是 VueRouter实例(this.$router)
        originPush.call(this, location, resolve, reject)
    }
    else {
        // call 和 apply区别,call传参用,分开 apply传数组,二者用于改变this指向并且调用函数
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 具体配置
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            // 用 params 参数要起名字 
            name: 'search',
            // 如果已经占位要求params参数,但是没有传,路径有问题
            // path: '/search/:keyword?',指定 params可传可不传 
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        // 重定向,项目跑起来立刻访问首页
        {
            path: '*',
            redirect: '/home'
        }

    ]
})