<template>
  <div id="app">
    <!-- <keep-alive exclude="Discover"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
@import "assets/css/common.css";
</style>