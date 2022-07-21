#### 新接口 http://gmall-h5-api.atguigu.cn 
1.路由组件:Home首页组件,Search搜索组件,Login登录组件，Register注册组件 <br/>
2.非路由组件:Header(都有),Footer(在登录页、注册页没有) 分析结构,拆分组件 <br/>
3.路由基本配置和 push replace的重写 <br/>
4.对axios进行2次封装 API文件夹放axios内容 <br/>
5.接口统一管理:如果项目小可以在组件生命周期中发请求,否则要统一管理 <br/>
6.解决跨域 JSONP,CROS,代理 代理服务器可看 vue-cli 文档(配置vue.config.js) <br/>
7.nprogress进度条使用 start开始，done结束，颜色可改 <br/>
8.vuex 集中管理数据 (模块化开发) 大仓库中引入小仓库 <br/>
9.实现三级分类数据展示 + 鼠标放一级分类变色 + 二三级分类显示隐藏(css改js实现) <br/>

10.防抖节流(lodash库) 防抖是回城,打断就重来,节流是技能cd,没好不能用 TypeNav使用节流throttle<br/>
11.三级联动路由跳转和传参,把用户选的产品名字、ID传入Search 
如果使用声明式导航,服务器数据返回,创建组件实例一次性非常多,会出现卡顿
采用编程式导航:因为使用事件委派,需要自定义属性区分a标签和一二三级目录 <br/>
12.在Search模块中使用TypeNav,判断路由的path以控制显示和隐藏,并且加上过渡动画 <br/>
13.TypeNav优化,把请求数据放到App中,只挂载一次,避免多次请求浪费 <br/>
14.合并params和query参数,到手机类后搜索华为,需要把2个参数合并传给后端(注意在TypeNav和Header中都要添加,if判断实际上可以不加) <br/>
15.开发Home首页中的ListContainer和Floor组件 -> 通过mock实现
mock使用:
a.src下建mock文件夹 
b.准备json数据(创建json文件) 
c.把mock数据需要的图片放到public文件夹
d.开始mockjs模块虚拟数据(mockServe.js)
e.把 mockServe 文件在入口文件引入 <br/>
16.ListContainer--Swiper使用5版本,轮播图就是carousel 引包再引样式 然后写结构,最后new,
注意考虑请求数据是异步,结构需要时间才能渲染完整      
解决:watch(保证获取数据)+$nextTick(保证v-for渲染完成) $nextTick是dom更新后执行,保证页面中结构<br/>
17.Floor组件:vuex三连环 这个 action 在哪触发？不能在 Floor 中,在内部不能用v-for遍历2个组件
需要在 Home 路由组件中发,数据存在Home组件,通过props传给Floor,是同步数据,Swiper可以写在mounted
组件通信方式6种-- props:父子通信, 自定义事件:@xxx,$on,$emit 子给父通信, 全局事件总线:$bus 全能,
pubsub-js:vue中少用,全能 插槽 vuex  <br/>
18.把首页中的轮播图拆分为一个共用的全局组件Carousel,一个组件如果很多地方用,就变成全局组件 <br/>

19.Search模块开发:a.静态页面,组件拆分 b.发请求 c.vuex(三连环) d.获取仓库数据动态展示 
使用 getters 简化仓库中的数据  + Search 模块根据POST不同参数进行数据展示(Object.assign合并对象)
通过监听 $route 来控制发请求的时机
20.面包屑动态展示并实现删除手机效果(发请求更新页面,并且更新地址栏,去掉query参数)

