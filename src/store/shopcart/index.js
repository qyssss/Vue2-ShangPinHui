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
    },
    // 删除全部勾选的产品 需要调删单个产品的函数
    deleteAllCheckedCart({ dispatch, getters }) {
        // context 相当于小仓库
        // 获取购物车中全部产品 
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch("deleteCartListBySkuId", item.skuId) : ""
            // 将每次返回的promise添加到数组
            PromiseAll.push(promise)
        });
        // 如果promise都成功返回才成功
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的选中状态
    updateAllCartisChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
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