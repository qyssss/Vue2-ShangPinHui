<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑,带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌信息展示 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台售卖属性值展示(这里props是数组) -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<i
                      v-show="isOne"
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<i
                      v-show="isTwo"
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候要带参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>$ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 8,
        //每一页展示条数
        pageSize: 3,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // Object.assign 合并对象,发请求之前把参数整理好,让服务器返回需要的数据
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在发请求之前带给服务器参数
    this.getData();
  },
  computed: {
    // mapGetters用数组写法,因为getters计算没有划分模块
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    // 获取 Search 模块展示的产品多少数据
    ...mapState({ total: (state) => state.search.searchList.total }),
  },
  methods: {
    // 向服务器发请求获取 Search 模块数据(根据参数不同返回不同数据展示)
    // 把这次请求封装为函数,需要调用时调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName() {
      // 这些属性可有可无,设置为 undefined 就不带给服务器了,提高性能,
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.keyword = undefined;
      this.getData();
      // 地址栏也需要修改 进行路由跳转,自己跳自己
      // 只删除 query 参数,不必删除 params参数(华为)
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removeKeyword() {
      // 把面包屑删除
      this.searchParams.keyword = undefined;
      // 再次发请求
      this.getData();
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      // 进行路由跳转
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      // 整理品牌字段参数 "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 删除品牌信息
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性的回调
    attrInfo(attr, attrValue) {
      // 整理参数格式 ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      // 再发请求
      this.getData();
    },
    // 删除售卖属性
    removeAttr(index) {
      // 整理参数再发请求
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序操作
    changeOrder(flag) {
      // flag 标记用户点击的是综合还是价格
      // 获取起始状态
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      // 点击的按钮相同就取反
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      }
      // 点击的按钮不同就默认降序
      else {
        newOrder = `${flag}:"desc"`;
      }
      // 将 newOrder 赋给 searchParams 并且请求
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义事件 获取当前第几页
    getPageNo(pageNo) {
      // 整理参数
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    // 监听属性 watch中不要 this.$route, $route 和 data中的数据是平级的
    $route() {
      // 再次发请求前整理参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每一次请求完毕应该清除 一二三级分类的 id,让他接受下一次的 id,别的不用清,本来就覆盖
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.casstegory3Id = "";
    },
  },
};
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