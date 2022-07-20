<template>
  <div>
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home,Search显示，在Login,Register隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求,获取三级列表的数据,存储在仓库
    //  因为App挂载只运行一次,避免重复发请求,所以请求放在这里
    this.$store.dispatch("categoryList");
    
  },
};
</script>

<style>
</style>