<template>
  <div id="app">
    <!-- <keep-alive exclude="Discover"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <play-control></play-control>
  </div>
</template>

<script>
import PlayControl from "components/content/playControl/PlayControl";
export default {
  name: "App",
  components: {
    PlayControl,
  },
};
</script>

<style scoped>
@import "assets/css/common.css";
</style>