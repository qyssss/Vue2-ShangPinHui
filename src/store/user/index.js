// 登录与注册模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARLOGOUT(state) {
        // 把仓库中相关用户信息和本地存储清空
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 正常的话是后台把验证码发到手机号(但是无这个接口)
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return "success"
        }
        else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return "success"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器发的token是用户唯一标识符,将来通过token找服务器要数据
        if (result.code === 200) {
            commit("USERLOGIN", result.data.token)
            setToken(result.data.token)
            return "success"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 登录成功后获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit("GETUSERINFO", result.data)
            return "success"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code === 200) {
            // 不能在 action 里操作 state
            commit("CLEARLOGOUT")
            return "success"
        } else {
            return Promise.reject(new Error("fail"))
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