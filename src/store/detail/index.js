import { reqGoodsInfo } from '@/api'
const state = {
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    }
}
const getters = {
    categoryView(state) {
        // 不写 || {} 会返回 undefined 会报错, 空对象{}.不会报错
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}