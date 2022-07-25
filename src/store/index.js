import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

Vue.use(Vuex);
//state:存数据
// const state = {};
// 修改state的唯一手段
// const mutations = {};
// 可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// getters理解为计算书写，用于简化仓库数据
// const getters = {}

//对外暴露store类的一个实例
export default new Vuex.Store({
    // state,
    // mutations,
    // actions,
    // getters
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})