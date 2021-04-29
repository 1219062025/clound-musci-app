<template>
  <div id="theme-title">
    <slot name="left">
      <span class="title">{{title}}</span>
    </slot>
    <slot name="right">
      <el-button
        class="icon"
        size="mini"
        round
      >{{btn}}</el-button>
    </slot>
  </div>
</template>

<script>
export default {
  name: "ThemeTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
    btn: {
      type: String,
      default: "更多 ",
    },
  },
};
</script>

<style scoped>
#theme-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.title {
  width: 300px;
  font-size: 18px;
  font-weight: bold;
  /* 先强制一行内显示文本，默认值normal会自动换行 */
  white-space: nowrap;
  /* 超出的部分隐藏 */
  overflow: hidden;
  /* 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
}
</style>