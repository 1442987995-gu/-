
## 1项目路由分析
前端所谓路由：kv键值对
key:URL(地址栏中的路径）
value：相应的路由组件

完成非路由组件Header与Footer业务
开发项目时：
    1：书写静态页面（html+css）
    2：拆分组件
    3:获取服务器的数据动态展示
    4:完成相应的动态业务逻辑

注意：创建组件时，组件结构+组件的样式+图片资源

## 2路由组件搭建

2.1vue-router
路由组件应该有4个：Home、Search、Login、Register
    components文件夹：放置非路由组件
    pages|views文件夹：经常放置路由组件

配置路由
    项目当中配置的路由一般放置在router文件夹中

2.2总结
路由组件与非路由组件的区别?
    1.路由组件一般放置在pages文件夹，非路由放在component
    2.路由组件一般需要在router文件夹中进行注册（使用的即为组件名字）,非路由组件以标签形式使用
    3.注册完路由，不管是路由，还是非路由组件身上都有$route和$routerr

$route:一般获取路由信息【路径、query、params等等
$router:一般进行编程式导航进行路由跳转【push/replace】

## 3Footer组件显示与隐藏
显示或隐藏组件：v-if|v-show
Footer组件:在Home、Search显示Footer组件，在登录注册时隐藏

3.1 我们可以根据组件身上的$router获取当前路由的信息，通过路由路径判断Footer显示或隐藏
3.2 配置路由时，可以给路由添加路由元信息【meta】

## 4路由传参
4.1 路由跳转有几种方式？
    比如a->b
    声明式导航：router-link(一定要有to属性)，可以实现路由的跳转
    编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转

4.2 路由传参，参数有几种写法？
    params参数：属于路径当中的一部分，需要注意，在配置路由时，需要占位
    query参数:不属于路径当中的一部分，直接拼接在url后面

## 5路由传参面试题
1:路由传递参数（对象写法）path是否可以给params参数一起使用
答：路由跳转传参的时候，对象写法可以是name或path，但是path不能和params一起使用

2.如何指定params参数可传可不传
答：可以，但是url会出问题
    如何指定params参数可传可不传，在配置路由时，在占位符后加个？即可

3.prams如果传递的是空字符串，如何解决
答：使用undefined
    this.$router.push({name:'',params:{keyword:'' || undefined})

4.路由组件能不能传递props数据？
答：可以，而且有三种写法



