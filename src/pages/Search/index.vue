<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="this.searchParams.categoryName">{{searchParams.categoryName}}<i @click="closeBread">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="this.searchParams.keyword">{{searchParams.keyword}}<i @click="closeKeyword">x</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="this.searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="closeTrademark">x</i></li>
            <!-- 售卖平台的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="closeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMark="tradeMark" @attrInfos="attrInfos"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}"  @click="changeOrder(1)">
                  <a href="#">综合<span v-show="isOne" class="iconfont " :class="{'icon-arrowup':isAsc,'icon-arrowdown':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a href="#">价格<span v-show="isTwo" class="iconfont " :class="{'icon-arrowup':isAsc,'icon-arrowdown':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp; 
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
           <!-- 分页器 -->
           <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters,mapState } from 'vuex'
  export default {
    name: 'Search',
    data(){
      return{
          searchParams:{
            //一级分类id
            "category1id": "",
            //二级分类id
            "category2id": "",
            //三级分类id
            "category3id": "",
            //分类名字
            "categoryName": "",
            //关键字
            "keyword": "",
            //排序
            "order": "1:desc",
            //分页器用的:代表的是当前第几页
            "pageNo": 1,
            //展示数据个数
            "pageSize": 3,
            //平台售卖属性操作带的参数
            "props": [""],
            //品牌
            "trademark": ""
          }
      }
    },
    components: {
    SearchSelector,
},
    //组件挂载完之前执行一次
    beforeMount(){
      //es6新增的语法，用于合并对象，第一个参数是原数据，后面两个是合并过去的数据
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
    }
    ,
    //组件挂载完仅仅执行一次
    mounted(){
      this.getData()
    },
    computed:{
      ...mapGetters(['goodsList']),
      ...mapState({
        total:state=>state.search.getSearchInfo.total
      }),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      }
    },
    methods:{
      getData(){
         this.$store.dispatch('GetSearchInfo',this.searchParams)
      },
      //关闭面包屑，跳转到默认页面
      closeBread(){
        //首先清空名字和id
        //把相应的字段变为undfined，当前这个字段不会带个服务器
         this.searchParams.categoryName = undefined;
         this.searchParams.category1id = undefined;
         this.searchParams.category2id = undefined;
         this.searchParams.category2id = undefined;
        //  //再发一次请求
         this.getData();
        //  //地址栏也要修改，如果路径中出现prams不应该删除
         if(this.$route.params){
             this.$router.push({name:"search",params:this.$route.params})
         }
      },
      //删除关键字
      closeKeyword(){
        //清空keyword
        this.searchParams.keyword=''
        //再次发请求
        this.getData()
        //通知兄弟组件清除关键字
        this.$bus.$emit('clear')
        //进行路由跳转
       
          this.$router.push({name:'search',query:this.$route.query})
      },
      //删除品牌信息
      closeTrademark(){
          this.searchParams.trademark = undefined
          this.getData()
      },
      //品牌的自定义事件,
      tradeMark(trademark){
        //传过来的是字符串类型，所以需要模板字符或jason.parse解析出来
          this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
          this.getData()
      },
      //售卖属性自定义事件
      attrInfos(attr,attrValue){
        //整理参数格式，注意它是数组的形式
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //数组去重
        if(this.searchParams.props.indexOf(props) === -1)  this.searchParams.props.push(props)
        this.getData()
      },
      //删除售卖属性
      closeAttr(index){
        //再次整理参数
        this.searchParams.props.splice(index,1)
        this.getData()
    },
    //排序的操作
    changeOrder(flag){
      //flag的形参：它是一个标记，1代表综合，2代表价格
        let originOrder = this.searchParams.order;
        //冒号前的字符，获取的是最开始的状态
        let originFlag = this.searchParams.order.split(":")[0]
        let originSort = this.searchParams.order.split(":")[1]
        //准备一个新的order属性值
        let newOrder = "";
        if(flag == originFlag ){
          //证明点击的一定是综合
          newOrder = `${originFlag}:${originSort == 'desc'?'asc ': 'desc'}`
        }else{
          newOrder = `${flag}:${'desc'}`
        }
        this.searchParams.order = newOrder
        this.getData()
        
    },
    //自定义事件，获取当前第几页
    getPageNo(pageNo){
        this.searchParams.pageNo = pageNo
        this.getData()
    }
    },
    //数据监听
    watch:{
      //监听路由的信息是否发生变化，如果发生变化，再次发起请求
      $route(newValue,oldValue){
        //每次请求完毕，应该把相应的1、2、3级分类的id清空
        this.searchParams.category1id = ''
        this.searchParams.category2id = ''
        this.searchParams.category3id = ''
        //再次整理发送给服务器的参数
         Object.assign(this.searchParams,this.$route.query,this.$route.params)
         //再次发起ajax请求
         this.getData()   
     }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>