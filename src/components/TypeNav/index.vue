<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category1Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category1Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
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
import { mapState } from "vuex";
// 这是全局引入 'lodash'
// import _ from "lodash";
// 按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移到哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕就可以发请求
  mounted() {
    // 当组件挂载完毕 让 show的属性变为false
    // 如果不是Home路由组件,将TypeNav隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    // 对象写法中,右侧需要的是一个函数,注入一个参数 state(是大仓库中的)
    // 这里没有使用命名空间,需要完整使用,否则区分不了要home还是search
    ...mapState({ categoryList: (state) => state.home.categoryList }),
  },
  methods: {
    // 鼠标进入修改响应式数据 currentIndex 实现节流需要用原始写法,回调别用箭头函数
    changeIndex: throttle(function (index) {
      // index 是鼠标移上某个一级分类的索引值
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转
    goSearch(e) {
      // 最好的解决方案是编程式导航+事件委派
      // 事件委派问题:1.怎么确定是 a 标签,2.如何获取参数
      // 解决:1.把子节点中 a 标签加自定义属性 data-categoryName e.target获取触发事件的dom元素
      // 节点有一个 dataset 属性可以获取节点的自定义属性(驼峰会变成小写categoryname),有这个属性就是 a 标签
      let element = e.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 2.再加自定义属性data-category1Id...区分一级二级三级分类 把要传的参数动态给query
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断: 如果路由跳转的时候带有params参数,需要一起带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 整理完参数 合并到 location
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入,让商品分类列表展示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    // 一级分类鼠标移出的回调
    leaveShow() {
      this.currentIndex = -1;
      // 判断如果是 Search 路由组件才会执行
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
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
      // overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
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

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: rgb(85, 252, 2);
        }
        /* .item:hover{
          background-color: pink;
        } */
      }
    }
    // 过渡动画 name="sort"
    // 进入的开始
    .sort-enter {
      height: 0;
    }
    // 进入结束状态
    .sort-enter-to {
      height: 461px;
    }
    /*  // 离开的
    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0;
    } */
    // 定义动画时间 速度
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    /* .sort-leave-active {
      transition: all 0.5s linear;
    } */
  }
}
</style>