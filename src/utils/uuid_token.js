import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久化存储
export const getUUID = ()=>{
    //先从本地存储获取uuid（看一下本地存储里面是否拥有）
   let uuid_token = localStorage.getItem('UUID_TOKEN')
    if(!uuid_token){
        uuid_token = uuidv4()
        //本地存储存储一次
        localStorage.setItem('UUID_TOKEN',uuid_token)
    }
    //注意要有返回值，否侧会显示undfined
    return uuid_token
}