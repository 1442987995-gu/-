<template>
    <div>
        <!-- 三级联动全局组件,这里不需要在引入了 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue';
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';
import { mapState } from 'vuex';

    //引入其余组件
    export default {
    name: "Home",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
     computed:{
     ...mapState({
          floorList:(state)=>state.home.floorList
     })
  },
  mounted(){
    //派发action,获取floor的数据
     this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less">
.fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }
</style>