import Home from '../pages/Home/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Search from '../pages/Search/index.vue'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCar from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default  [
  {
    path:'/center',
    component:Center,
    meta:{show:true},
    children:[
        {
          path:'myorder',
          component:MyOrder
        },
        {
          path:'grouporder',
          component:GroupOrder
        },
        {
          path:'/center',
          redirect:'/center/myorder'
        }
    ]
  },
  {
    path:'/paysuccess',
    name:'paysuccess',
    component:PaySuccess,
    meta:{show:true}
  },
  {
    path:'/pay',
    name:'pay',
    component:Pay ,
    meta:{show:true},
    //独享路由
    beforeEnter:(to,from,next)=>{
      if(from.path == '/trade'){
        next()
      }else{
        //如果不是从trade让它回到原页面
        next(false)
      }
  }
  },
  {
    path:'/trade',
    name:'trade',
    component:Trade ,
    meta:{show:true},
    //独享路由
    beforeEnter:(to,from,next)=>{
      if(from.path == '/shopcar'){
        next()
      }else{
        //如果不是从shopcar让它回到原页面
        next(false)
      }
  }
  },
    {
      path:'/shopcar',
      name:'shopcar',
      component:ShopCar ,
      meta:{show:true},
      
    },
    {
        path:'/AddCartSuccess',
        name:'AddCartSuccess',
        component:AddCartSuccess ,
        meta:{show:true}
      },
    {
      path:'/detail/:skuId',
      component:Detail,
      meta:{show:true}
    },
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {   
      //?是代表params参数可传可不传
        path:'/search/:keyword?',
        name:"search",
        component:Search,
        meta:{show:true}
    },
    {
        //路由重定向，项目跑起来时，访问/，让它定向到首页
        path:'*',
        redirect:'/home'
    }
]