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
};
</script>

<style>
</style>