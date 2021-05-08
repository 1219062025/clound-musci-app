<template>
  <div id="control-panel">
    <div class="header">
      <span
        class="icon back"
        @click="$emit('close')"
      ></span>
      <div class="title">爱笑的眼睛</div>
      <span class="icon share"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlPanel",
};
</script>

<style scoped>
#control-panel {
  width: 100%;
  height: 100%;
  background: red;
}
.header {
  display: flex;
  width: 100%;
  height: 39px;
  justify-content: space-around;
  align-items: center;
}
.title {
  width: 200px;
  height: 100%;
  flex: 1 0 200;
  text-align: center;
}
.back {
  font-size: 40px;
}
.share {
  font-size: 25px;
}
</style>