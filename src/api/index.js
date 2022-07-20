// 当前模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

// 地址：/api/product/getBaseCategoryList 类型：GET 无参数
// 三级联动的接口
// 发请求 axios发请求返回 Promise 对象
export const reqCategoryList = () => 
requests({ url: "/product/getBaseCategoryList", method: "GET" })

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取 floor 数据
export const reqFloorList = () => mockRequests.get('/floor')





