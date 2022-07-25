//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(VueRouter)
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }
import store from '@/store'
// //先把VueRouter原型对象的push，先保存一份

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
 
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    })
  }
}
 
VueRouter.prototype.replace = function (location, resole, reject) {
  if (resole && reject) {
    originReplace.call(this, location, resole, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    })
  }
}

let router =  new VueRouter({
   routes,
   scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})
//全局守卫:前置路由守卫
router.beforeEach(async (to,from,next)=>{
  //to是要跳到哪个路由的信息
  //from是从哪里来
  //next是放行
  let token = store.state.user.token;
  //这里别漏写user否则找不到
  let name = store.state.user.userInfo.name
  if(token){
    //用户想去login，但是不能去
      if(to.path=='/login'||to.path == 'register'){
          next('/home')
      }else{
        //正常情况
          if(name){
            //如果有用户名就正常跳
              next()
          }else{
               try {
                 //如果没有用户名就再派发一次action
                   await store.dispatch('getUserInfo')
                   next()
               } catch (error) {
                //token失效了获取不到用户信息，重新登录
                //清除token
                   await store.dispatch('userLogout')
                   next('/login')
               }
          }
      }
  }else{
    //没有登录的情况
    let toPath =to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      //把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath)
    }else{
      next()
    }
  }

})
export default router