//search模块小仓库
import {retGetSearchInfo} from '@/api'
const actions = {
   async GetSearchInfo({commit},params={}){
      let result = await retGetSearchInfo(params)
      if(result.code === 200){
        commit('GETSEARCHINFO',result.data)
      }
    }
};
const mutations = {
    GETSEARCHINFO(state,value){
        state.getSearchInfo = value
    }
};
const state = {
    getSearchInfo:{}
};
//用于简化数据
const getters = {
    //当前的state是search小仓库的
    attrsList(state){
        return state.getSearchInfo.attrsList || []
    },
    goodsList(state){
        return state.getSearchInfo.goodsList || []
    },
    trademarkList(state){
        return state.getSearchInfo.trademarkList || []
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}