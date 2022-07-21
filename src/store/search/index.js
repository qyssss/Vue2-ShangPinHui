import { reqGetSearchInfo } from '@/api'
// search 模块的小仓库
const state = {
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取 Search 模块数据
    async getSearchList({ commit }, params = {}) {
        // reqGetSearchInfo 至少要传一个空对象
        // params 形参是当用户派发 action 时第二个参数传过来的
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
}
// 这个类似计算属性,为简化仓库中的数据而生,可以把将来在组件当中用的数据简化,会更加方便
const getters = {
    // 这里的 state 是当前仓库的
    goodsList(state) {
        // 加个 || [] 是因为如果网络不好,还没请求到数据会返回undefined,用一个数组以防万一
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}