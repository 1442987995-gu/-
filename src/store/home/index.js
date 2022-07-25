//home模块小仓库
import {reqCategoryList,reqGetBannerList, reqGetFloorList} from '@/api'

const actions = {
   
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
  async categoryList({commit}){
      let result = await reqCategoryList();
      if(result.code === 200){
        commit('CATEGORYLIST',result.data)
      }
    },
    //获取首页轮播图的数据
   async getBannerList({commit}){
     let result =  await reqGetBannerList();
     if(result.code === 200){
        commit('GETBANNERLIST',result.data)
      }
    },
    //获取底部轮播图的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code === 200){
          commit('GETFLOORLIST',result.data)
        }
    }

};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.splice(0,15)
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,value){
        state.floorList = value
    }
};
const state = {
    //state中默认数据不能乱写
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    floorList:[]
};
const getters = {};
export default {
    module,
    actions,
    mutations,
    state,
    getters
}