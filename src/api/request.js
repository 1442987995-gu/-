//对axios进行二次封装
import axios from 'axios'
//引入store
import store from '@/store'
//引入进度条
import nProgress  from 'nprogress';
//进度条样式
import 'nprogress/nprogress.css'
//start:开始，done:结束

//1:利用axios对象的方法create，去创建一个axios实例
//2:request就是axios,只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求时，会在路径中出现api
    baseURL:'/api',
    //代表请求超时的时间5s
    timeout:5000
});
//请求拦截器：在发请求之前，它可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里有一个重要属性：header请求头
    //进度条开始
    if(store.state.detail.uuid_token){
        //给请求头添加字段，地和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        //给请求头添加字段，地和后台商量好
        config.headers.token= store.state.user.token
    }
    nProgress.start();
    return config
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调，服务器返回数据后，它可以检测到，可以做一些事情
    //进度条结束
    nProgress.done()
    return res.data
},(err)=>{
    //失败的回调
    return Promise.reject(new Error('faile'));
})

//对外暴露
export default requests