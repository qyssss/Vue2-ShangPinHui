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

// 获取验证码接口 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册接口 /api/user/passport/register post phone,code,password
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    method: 'post',
    data,
})

// 登录接口 /api/user/passport/login post phone,password
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data,
})

// 登录后用token获取用户信息 /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

// 退出登录 /api/user/passport/logout
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 获取商品清单 /api/order/auth/trade get
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
})

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// 我的订单列表 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})






