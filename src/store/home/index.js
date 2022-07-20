import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// home 模块的小仓库
const state = {
    // 服务器返回什么类型,这边数据就初始化为什么类型
    categoryList: [],
    bannerList: [],
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }

}
const actions = {
    // 通过 API 里面的接口函数调用,向服务器发请求,获取数据 
    // 因为 reqCategoryList() 是 axios返回的Promise对象,需要用 await得到返回结果
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code === 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    // 获取 floor 数据 
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}