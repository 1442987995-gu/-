<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <!-- 在Home、search显示，在登录，注册隐藏 -->
        <!-- v-show="$route.path =='/home'||$route.path =='/search'" -->
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
      name:'App',
      components:{
        Header,
        Footer
      },
      mounted(){
         //通知Vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch("categoryList");
      }
}
</script>

<style>
</style>
