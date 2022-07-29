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

// 获取搜索模块数据 /api/list post请求,需要带参数,参数从外部接收 
// 这个接口传的东西至少是一个空对象(默认参数)
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params
});

// 获取产品详情信息的接口 /api/item/{ skuId } GET
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: "get",
})

// 将产品添加到购物车或者更新产品个数 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
})
// 获取购物车列表数据接口 /api/cart/cartList GET
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})
// 删除购物车产品接口 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
})
// 修改产品选中状态接口 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})




