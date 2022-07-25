//存储token
export const SetToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
export const GetToken = ( )=>{
   return localStorage.getItem('TOKEN')
}
export const removeToken = ( )=>{
    return localStorage.removeItem('TOKEN')
 }