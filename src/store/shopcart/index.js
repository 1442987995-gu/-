//search模块小仓库
import {reqCartList,reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const actions = {
    //获取购物车列表数据
   async getCartList({commit}){
      let result = await reqCartList()
      if(result.code == 200){
        commit('GETCARTLIST',result.data)
      }
    },
    //删除购物车某一个产品
   async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById (skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //修改商品状态
   async reqUpdateCheckedById({commit},{skuId,isChecked}){
        let result = await  reqUpdateCheckedById(skuId,isChecked)
        if(result.code  == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //context就是一个小仓库
    //删除所有选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
       getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId) : ''
            //将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        //Promise.all该方法会遍历其中的每一个promise对象，有一个错误就返回失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll = [];
        console.log(getters);
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = dispatch('reqUpdateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
};
const mutations = {
    GETCARTLIST(state,val){
        state.cartList = val
    }
};
const state = {
    cartList:[]
};
//用于简化数据
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}