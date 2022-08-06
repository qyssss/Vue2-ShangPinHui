// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引二级路由组建
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

// 路由配置信息
export default [
    {
        path: '/home',
        // 路由懒加载 !!!!!!!!!!!!!!!!!
        component: () => import("@/pages/Home"),
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
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                // 停在当前页
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                // 停在当前页
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                // 开始应该显示点东西,路由重定向
                path: '/center',
                redirect: '/center/myorder',
            }
        ]
    },
    // 重定向,项目跑起来立刻访问首页
    {
        path: '*',
        redirect: '/home'
    }
]