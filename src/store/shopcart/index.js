import { reqCartList, reqDeleteCart, reqUpdateCheckedById } from '@/api'
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return "success"
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return "success"
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters

}