<template>
  <div class="pagination">

    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo ==1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <template v-for="(page, index) in startNumAndEndNum.end">
      <button v-if="page >= startNumAndEndNum.start" :key="index" @click="$emit('getPageNo',page)" :class="{active:pageNo ==page}">
        {{ page }}
      </button>
    </template>

    <button v-if="startNumAndEndNum.end < PageTotal - 1">···</button>
    <button v-if="startNumAndEndNum.end < PageTotal" @click="$emit('getPageNo',PageTotal)" :class="{active:pageNo ==PageTotal}">{{ PageTotal }}</button>
    <button @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总页数
    PageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码起始数字和结束数字
    startNumAndEndNum() {
      let start = 0;
      let end = 0;
      //出现不够5页的情况
      if (this.continues > this.PageTotal) {
        start = 1;
        end = this.PageTotal;
      } else {
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
      }
      //出现页码为负数的情况
      if (start < 1) {
        start = 1;
        end = this.continues;
      }
      //出现页码数大于总页数的情况
      if (end > this.PageTotal) {
        end = this.PageTotal;
        start = this.PageTotal - this.continues + 1;
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
  actine{
    background-color: skyblue;
  }
}
</style>