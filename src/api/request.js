// 对 axios 进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
//  start方法代表开始，done代表结束

// 1.利用axios对象方法create创建一个axios实例
// 2.request就是axios,但是可以配置
const requests = axios.create({
    // 配置对象
    // 基础路径,发请求时路径出现api,不用自己写了
    baseURL: '/api',
    // 代表请求超时时间是5秒
    timeout: 5000,
})
// 请求拦截器:在发请求之前,请求拦截器可以监测到,可在请求发出前做一些事
requests.interceptors.request.use((config) => {
    // config 是一个配置对象,里面有一个属性重要,header请求头
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数:服务器响应数据回来后可以监测到,可做一些事
    // 进度条结束
    nprogress.done()
    // 为什么返回一个response.data 而不是直接返回response??
    // 解答:原因是axios会自动给我们再套一层.直接返回response.data就避免我们response.data.data.xxx了
    return res.data
}, (error) => {
    // 响应失败的回调函数 可以选择终结这个 Promise
    return Promise.reject(new Error('fail'))
})

export default requests
