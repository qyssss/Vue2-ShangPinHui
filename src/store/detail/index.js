import { reqAddOrUpdateShopCart, reqGoodsInfo } from '@/api'
// 封装临时游客身份的模块-->uuid(不能变化)
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 将产品添加到购物车 async返回的一定是Promise(成功或者失败)
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车后(发请求),把参数给了服务器,没有返回数据
        // 因此不需要三连环
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前函数执行返回Promise 
        // 代表加入购物车成功
        if (result.code === 200) {
            return "success"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('fail'))
        }

    }
}
const getters = {
    // 简化路径导航
    categoryView(state) {
        // 不写 || {} 会返回 undefined 会报错, 空对象{}.不会报错
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}