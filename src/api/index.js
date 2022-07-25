//当前模块：api进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'

//三级联动的接口
///api/product/getBaseCategoryList  get 无参数
//发请求:axios发请求返回结果为Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList ',method:'get'})

//获取banner轮播图的接口
export const reqGetBannerList = ()=>mockRequest({url:'/banner'})
//获取floor轮播图的接口
export const reqGetFloorList = ()=>mockRequest({url:'/floor'})
//获取搜索页面的数据,注意这里要把参数带过去
export const retGetSearchInfo = (params)=>requests({url:'list',method:'post',data:params})
//获取detail商品详情页的数据
export const reqGetDetailInfo = (skuId) =>requests({url:`/item/${skuId}`,method:'get'})
//向服务器发送购物车的数量和id
export const addOrUpdateShopCart = (skuId,skuNum) =>requests({url:`cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车列表数据接口
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})
//删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//修改商品中的状态
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})
//登录
export const reqUserLogin = (data) =>requests({url:'/user/passport/login',data,method:'post'})
//获取用户信息,需要带着用户的token向服务器要用户信息
export const reqUserInfo = () =>requests ({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录
export const reqLogout = ()=>requests ({url:'/user/passport/logout',method:'get'})
//获取用户地址信息
export const reqAddressInfo = ()=>requests ({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取订单信息
export const reqOrderInfo = ()=>requests ({url:'/order/auth/trade',method:'get'})
//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests ({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo= (orderId)=>requests ({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询支付状态
export const reqPayState = (orderId) =>requests ({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单数据
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
