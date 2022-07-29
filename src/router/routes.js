// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
// 路由配置信息
export default [
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
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    // 重定向,项目跑起来立刻访问首页
    {
        path: '*',
        redirect: '/home'
    }
]