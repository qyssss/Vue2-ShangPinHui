// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
// 引入路由具体配置
import routes from './routes';
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
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
// 全局守卫(前置)
router.beforeEach(async (to, from, next) => {
    // 有 token 代表已经登录
    let token = store.state.user.token
    // 用户信息 如果用store.state.user.userInfo空对象会为真
    let name = store.state.user.userInfo.name
    if (token) {
        // 如果已经登录还想去登录就停着首页
        if (to.path == '/login') {
            next('/')
        } else {
            // 登录了 要保证有用户信息再放行
            if (name) {
                next()
            } else {
                // 没有用户信息 -> 向仓库发请求获取用户信息在首页展示
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    // token 失效了获取不了用户信息,要重新登录
                    // 清除 token
                    await store.dispatch("userLogout")
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        next()
    }
})
export default router