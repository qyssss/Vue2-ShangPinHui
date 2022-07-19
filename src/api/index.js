// 当前模块：API进行统一管理
import requests from "./request";

// 三级联动的接口
// 地址：/api/product/getBaseCategoryList 类型：GET 无参数

// 发请求 axios发请求返回 Promise 对象
export const reqCategoryList = () => 
requests({ url: "/product/getBaseCategoryList", method: "GET" })




