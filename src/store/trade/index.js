//search模块小仓库
import {reqAddressInfo,reqOrderInfo} from '@/api'
const actions = {
    //获取用户地址信息
   async getUserAddress({commit}){
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    //获取用户订单信息
    async getUserOrder({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETUSERORDER',result.data)
        }
    }
};
const mutations = {
    GETUSERADDRESS(state,val){
        state.address = val
    },
    GETUSERORDER(state,val){
        state.order = val
    },
};
const state = {
    address:[],
    order:{}
};
//用于简化数据
const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}