<template>
  <!-- 分页器 -->
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 需要当前页数(pageNo)、展示多少条数据(pageSize)、
  // 一共展示多少数据(total)、分页器连续的页面个数(continues)
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 重点计算连续页面起始和结束数字!!!
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      let start = 0,
        end = 0;
      // 总页数小于连续页码
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 总页数大于连续页码数(正常情况)
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 不正常情况(start出现0,负数)
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
