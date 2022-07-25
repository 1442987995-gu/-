import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//三级联动组件---注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//引入element-ui
import {MessageBox,Form,FormItem,Input,Button,CheckboxGroup,Checkbox} from 'element-ui';
//统一接口api文件夹里全部请求参数
import *as API from '@/api'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(MessageBox.name,MessageBox)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Input.name,Input)
Vue.component(Button.name,Button)
Vue.component(CheckboxGroup.name,CheckboxGroup)
Vue.component(Checkbox.name,Checkbox)
Vue.config.productionTip = false
//引入mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入vue-lazyload
import VueLazyload from 'vue-lazyload'
import gif from '@/assets/1.gif'
Vue.use(VueLazyload,{
  loading:gif,
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API,
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },


}).$mount('#app')
