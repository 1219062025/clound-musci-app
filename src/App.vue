<template>
  <div id="app">
    <!-- <keep-alive exclude="Discover"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="100%"
      direction="btt"
    >
      <control-panel @close="close"></control-panel>
    </el-drawer>
    <play-control @popup="popup"></play-control>
  </div>
</template>

<script>
import PlayControl from "components/content/playControl/PlayControl";
import ControlPanel from "components/content/playControl/children/ControlPanel";
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  components: {
    PlayControl,
    ControlPanel,
  },
  methods: {
    popup() {
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
@import "assets/css/common.css";
</style>