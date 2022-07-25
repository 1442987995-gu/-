//注册登录模块
import {reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout} from '@/api'
import {SetToken,GetToken,removeToken } from '@/utils/token'
const actions = {
    //获取验证码
   async getCode({commit},phone){
        //获取验证码的这个接口，把验证码返回，如果是正常情况是由后端来完成
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //注册
   async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录
   async userLogin({commit},data){
      let result = await reqUserLogin(data)
      if(result.code == 200){
        //服务器下发token，用户唯一标识
        //将来经常通过带token找服务器要用户信息进行展示
        commit('USERLOGIN',result.data.token)
        //持久化存储token
        SetToken(result.data.token)
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
    }
    },
    //获取用户信息
   async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登录
    async userLogout({commit}){
       let result =await reqLogout()
       if(result.code==200){
           commit('LOGOUT',result.data)
       }
    }
};
const mutations = {
    GETCODE(state,val){
        state.code = val
    },
    USERLOGIN(state,val){
        state.token = val
    },
    GETUSERINFO(state,val){
        state.userInfo = val
    },
    LOGOUT(state,val){
        state.token='',
        state.userInfo = {},
        removeToken()
    }
};
const state = {
    code:'',
    token:GetToken(),
    userInfo:{}
};
const getters = {};
export default {
    module,
    actions,
    mutations,
    state,
    getters
}