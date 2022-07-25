//home模块小仓库
import {reqGetDetailInfo,addOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const actions = {
   
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
  async GetGoodsInfo({commit},skuId){
      let result = await reqGetDetailInfo(skuId);
      if(result.code === 200){
        commit('GETGOODSINFO',result.data)
      }
    },
    //将产品添加到购物车中
   async addShopCart({commit},{skuId,skuNum}){
    //加入购物车的结构
    //加入购物车后，前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他的数据，只是返回状态马
       let result = await addOrUpdateShopCart(skuId,skuNum)
       if(result.code == 200){
            return 'ok'
       }else{
            return Promise.reject(new Error('faile'))
       }
    }
};
const mutations = {
    GETGOODSINFO(state,val){
        state.goodsInfo = val
    },
};
const state = {
    //state中默认数据不能乱写
    goodsInfo:{},
    //游客临时身份
    uuid_token:getUUID()
};
const getters = {
    //空对象的categoryView属性值为undefined
    categoryView(){
        return state.goodsInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(){
        return state.goodsInfo.skuInfo ||{}
    },
    //简化售卖属性的数据
    spuSaleAttrList(){
        return state.goodsInfo.spuSaleAttrList ||{}
    }
};
export default {
    module,
    actions,
    mutations,
    state,
    getters
}