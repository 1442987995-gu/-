<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow" >
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              id="sb"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a  :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                  c1.categoryName
                }}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
              </h3>
              <!-- 二级，三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                        c2.categoryName
                      }}</a>
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a  :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                          c3.categoryName
                        }}</a>
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//把lodash全部功能函数引入
//最后的引入方式是按需引入
import _ from "lodash";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪个一级分类
      currentIndex: -1,
      show:true
    };
  },
  //组件挂载完毕，可以向服务器发送请求
  mounted() {
   
    //当组件挂载完毕，让show属性变为false
    //如果不是home路由组件，将typeNav进行隐藏
    if(this.$route.path !== '/home'){
      this.show = false
    }
  },
  computed: {
    // ...mapState(['categoryList'])
    //对象写法，右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    //注入一个参数state,其实就是大仓库中的数据
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标进入修改响应数据currentIndex
    //做了一个节流处理
    changeIndex: _.throttle(function (index) {
      //index:鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 50),
    //鼠标移除回调
    leaveShow() {
      this.currentIndex = -1;
      if(this.$route.path!='/home'){
       this.show = false
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委托
      //利用事件委托存在问题：1：点击的一定是a标签 2.如何获取参数【1、2、3级分类的产品的名字和id】3.它会把全部子节点的时间委派给父节点
      //存在另外一个问题：即使你能确定点击的是a标签，怎么确定点击的是1、2、3级标签

      //把子节点的a标签加上自定义属性，其余的子节点是没有的
      let element = event.target
      //获取到当前事件的节点，需要带有自定义属性的节点
      //节点有一个dataset属性，可获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      if(categoryname){
        //整理路由跳转的参数
        let location = {name:"search"};
        let query = {categoryName:categoryname}
        //区别一级、二级、三级分类
         if(category1id){
             query.category1id = category1id
         }else if(category2id){
             query.category2id = category2id
         }else{
             query.category3id = category3id
         }
         //如果路由有params参数，捎带过去
         if(this.$route.params){
           location.params = this.$route.params
           //处理完参数
           location.query = query
              //路由跳转
         this.$router.push(location)
         }
        
         
      }
    },
    //当鼠标移入时，让商品分类列表进行展示
    enterShow(){
      this.show = true
  },
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画样式,进入开始状态
    .sort-enter{
      
      height:0px;
    }
    .sort-enter-to{
      height:461px;
    }
    //定义动画速率
    .sort-enter-active{
        transition:all .5s linear;
        overflow: hidden;
    }
  }
}
</style>