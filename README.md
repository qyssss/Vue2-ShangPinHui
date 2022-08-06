## 上线地址 http://112.74.191.169/ 
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
通过监听 $route 来控制发请求的时机 <br/>
20.面包屑动态展示并实现删除分类效果(发请求更新页面,并且更新地址栏,去掉query参数),
删除关键字效果,要在Search组件中修改Header组件中的文本(兄弟组件通信,使用$bus)
处理品牌信息和平台售卖属性点击和删除 通过 SearchSelector 子给父传参后发请求<br/>
21.小重点:排序操作 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
考虑:a.谁有类名,通过order属性值是1还是2判断 b.谁有箭头(谁有类名谁有) 
c.通过传参标记用户点击的按钮,和起始状态比较(分为相同和不同),决定新的order,再发请求给服务器

22.!!!分页器(全局组件):需要当前页数(pageNo)、展示多少条数据(pageSize)、一共展示多少数据(total)、分页器连续的页面个数(continues) 重点!!!:计算连续页面的起始数字和结束数字 
动态展示:分为上中下,注意显示的条件,再把数据通过自定义事件传给父组件,后更新数据发服务器 <br/>

23.详情模块:点击商品图片跳转详情,需要传params参数(产品id) ps:路由滚动行为scrollBehavior
静态组件->api接口->vuex获取产品信息,注意使用请求返回的数据时 || {}或者[],防止返回undefined报错
用排他思想实现产品售卖属性高亮 
放大镜(轮播图中兄弟组件传值,用offsetX,offsetY获取鼠标位置实现放大镜,大图通过-2倍距离实现) <br/>
24.详情模块中的购物车
a.表单中修改产品个数(保证用户输入合法)
b.加入购物车:post请求把参数传给服务器,通过await等待仓库中的Promise返回判断加入购物车成功或者失败
c.AddCartSuccess成功路由跳转和传参--使用会话存储(H5新增),本地持久化-5M,会话存储非持久 <br/>

25.购物车模块 
a.写接口->发请求->vuex->获取数据->展示 
b.想要后端返回需要一个身份(使用uuid临时游客),uuid不应该变化且一直存储(放在localStorage),不能在接口中带uuid,只能在请求拦截器中的响应头带上,后端拿到才返回对应数据  vue自带uuid
c.实现静态(价格计算、全选框) 实现修改某个产品个数(把产品变化量发给后端后再请求一次更新数据)+节流
d.删除某1个产品:写接口->vuex->组件dispatch传id,成功就再请求更新页面 
e.修改产品状态:写接口,发请求,传skuId, isChecked,成功就再发请求更新数据 
f.删除选中的全部产品操作:在仓库中使用删除单个商品接口,接收返回的多个promise,用Promise.all判断成功
g.全选操作: 和删除选中产品基本一致,遍历购物车发请求调用修改某个产品的勾选状态 <br/>

26.登录注册必须会 !!! 和git一样重要
assets 放全部组件共用的资源 , css 用 ~@ 代表src路径

注册业务
获取验证码接口 /api/user/passport/sendCode/{phone} 
判断格式的后面再做 业务:获取验证码接口和注册接口,都要判断是否成功

登录业务
注册时通过数据库存储了信息,登录成功时为了区分用户是谁->服务器给了一个token
一般前端持久存储token(令牌),通过这个token再向服务器要数据(vuex存储数据不持久化!)
登录成功后要用token(放在请求头)向服务器要数据(接口/api/user/passport/auth/getUserInfo)
为了持久化存储token要用localStorage  
退出登录: 1.发请求通知服务器退出登录(清除数据token) 2.清除项目中的本地存储数据 3.退出后回首页

登录问题:a.多个组件展示用户信息都需要自己触发action b.用户已经登录了还能登录 要用导航守卫解决!!!
思路:全局守卫(前置),a.通过token判断是否登录,通过仓库中数据判断有没有用户信息,没有用户信息就发请求要,如果有token但是没要到(说明token失效),就登出后要求用户重新登录 b.判断路径为登录页则跳转到首页

统一使用 13700000000 111111 登录  <br/>

27. Trade 模块 : 获取用户地址接口和获取订单交易页信息接口->写仓库->展示数据 <br/>
28. Trade 中提交订单:支付静态组件->点击提交订单按钮时还需要向服务器发请求并路由跳转(传递支付信息) 从此开始不使用 vuex , 通过 main.js 中 vue.prototype.$API 把接口统一拿到,可用this.$API访问接口
！！！别在生命周期函数里用 async  <br/>
29.支付页面 按需使用 element-ui 支付弹框(MessageBox) 使用 qrcode 生成二维码,通过订单状态接口判断支付是否成功 用定时器一直发请求,成功就路由跳转并且清定时器 <br/>
30.个人中心 Center (二级路由)  静态展示我的订单部分 其中合并单元格部分比较巧妙 然后复用分页器组件 <br/>

最后一天 
31.全局守卫 
未登录访问 Trade、Pay、PaySuccess、Center 应该跳转到登录页 
需求: 没登录时去不了,登录了应该去之前想去的地方  
解决: 把未登录时想去而没去的信息存在 query,在 Login 组件修改路由跳转 <br/>

32.路由独享守卫 写在路由部分 beforeEnter
只有购物车页面才能跳到交易 
必须从交易页才能跳到支付页
支付成功才能进入 paysuccess (使用组件内守卫,很少用) <br/>
 
33.图片懒加载  npm i vue-lazyload@1.3.3  顺便复习一下 plugins <br/>

34.表单验证 vee-validate 差不多会用即可 cnpm i vee-validate@2 <br/>

35.路由懒加载 当路由被访问的时候才加载对应组件，这样就会更加高效 
component: () => import("@/pages/Home"),  以后在路由中都这么引入组件
<br/>

36.打包上线 dist下有 map 文件提示哪里报错,上线不需要可以删除
在 vue.config.js 配置 productionSourceMap:false  
使用阿里云服务器 设置安全组开放端口  nginx 反向代理 




