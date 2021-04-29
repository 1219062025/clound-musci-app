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
      default: "更多 ",
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
  font-size: 18px;
  font-weight: bold;
}
</style>