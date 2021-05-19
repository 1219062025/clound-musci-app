<template>
  <div id="control">
    <!-- 音频标签 -->
    <audio
      :src="audio.audioUrl"
      ref="audio"
      loop="true"
    ></audio>
    <!-- 播放栏歌曲描述 -->
    <div
      class="info"
      @click="popup"
    >
      <img
        class="pic"
        :src="audio.pic"
        :class="{route: $store.state.isPlayed, pause: !$store.state.isPlayed}"
      >
      <div class="single">{{audio.name}}
        <span
          class="tns"
          v-if="audio.tns"
        >({{audio.tns}})</span>
        <span class="name"> - {{audio.artists}}</span>
      </div>
    </div>
    <!-- 播放栏控制按钮与列表 -->
    <div class="btn">
      <span
        class="indicator"
        @click="playSwitch"
      >
        <span
          class="icon play"
          :class="{begin: !audio.name}"
          ref="play"
        ></span>
        <el-progress
          type="circle"
          :width='28'
          :show-text="false"
          :stroke-width='2'
          color="#707174"
          v-if="!isNaN(percentage)"
          :percentage="percentage"
        ></el-progress>
      </span>
      <span class="icon list"></span>
    </div>
    <!-- 弹出播放详情控制 -->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :modal="false"
      size="100vh"
      direction="btt"
    >
      <control-panel
        @change="change"
        @playSwitch="playSwitch"
        @close="drawer = false"
        :is-played="$store.state.isPlayed"
      ></control-panel>
    </el-drawer>
  </div>
</template>

<script>
import ControlPanel from "components/content/playControl/children/ControlPanel";

export default {
  name: "PlayControl",
  data() {
    return {
      // 保存歌曲所有相关信息的对象，注意不是HTML结构中的音频标签对象
      audio: {},
      // 弹出播放详情控制的开关
      drawer: false,
      // 音频总时长
      duration: 0,
      // 音频已播放时长
      currentTime: 0,
    };
  },
  components: {
    ControlPanel,
  },
  methods: {
    popup() {
      this.audio.audioUrl
        ? (this.drawer = true)
        : this.$msgbox({
            message: "请先点播歌曲",
            showConfirmButton: false,
            center: true,
            customClass: "message-box",
          });
    },
    // 切换播放/暂停
    playSwitch() {
      if (this.$refs.audio.currentSrc && this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$refs.play.innerText = "";
      } else {
        this.$refs.audio.pause();
        this.$refs.play.innerText = "";
      }
      this.$store.state.isPlayed = !this.$store.state.isPlayed;
    },
    // 播放位置改变
    change(newTime) {
      this.$refs.audio.currentTime = newTime;
      this.$store.state.breakpoint = 0;
    },
  },
  computed: {
    // 音频当前播放时长映射element进度条组件的百分比
    percentage() {
      return Math.round((this.currentTime / this.duration) * 100);
    },
  },
  watch: {
    "$store.state.audio"(val) {
      this.audio = val;
    },
  },
  mounted() {
    // 侦听音频事件
    const audio = this.$refs.audio;
    // 音频播放
    audio.addEventListener("canplay", () => {
      this.$refs.audio.play();
      this.$refs.play.innerText = "";
      this.$store.state.isPlayed = true;
    });
    // // 音频暂停
    audio.addEventListener("pause", () => {
      this.$store.state.isPlayed = false;
    });
    // 音频结束
    audio.addEventListener("ended", () => {
      this.$store.state.isPlayed = false;
    });
    // 音频总时长变动
    audio.addEventListener("durationchange", () => {
      this.duration = this.$refs.audio.duration;
    });
    // 音频已播放时间变动
    audio.addEventListener("timeupdate", () => {
      this.$store.state.audio.currentTime = this.currentTime = this.$refs.audio.currentTime;
    });
  },
};
</script>

<style>
body .message-box {
  width: 140px;
  padding: 0;
  border: 0;
  background-color: rgba(66, 64, 64, 0.5);
}
body .message-box p {
  color: #fff;
}
body .v-modal {
  background: none;
}
</style>
<style scoped>
#control {
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 49px;
  padding: 0 15px;
  border-top: 1px solid #6e6e6e;
  background: #edf7f9;
  justify-content: space-between;
  align-items: center;
}
.pic {
  display: inline-block;
  width: 42px;
  height: 42px;
  border: 7px solid black;
  border-radius: 50%;
  margin-right: 10px;
}
.info {
  display: flex;
  align-items: center;
}

.single,
.tns {
  font-size: 14px;
}
.single {
  width: 19em;
  /* 先强制一行内显示文本，默认值normal会自动换行 */
  white-space: nowrap;
  /* 超出的部分隐藏 */
  overflow: hidden;
  /* 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
}
.name {
  font-size: 12px;
  color: #585659;
}
.btn {
  display: flex;
  align-items: center;
}
.indicator {
  position: relative;
  display: inline-block;
  height: 28px;
  margin-right: 20px;
}
.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.begin {
  width: 27px;
  height: 27px;
  line-height: 25px;
  border: 1px solid #dde1e9;
  border-radius: 50%;
  text-align: center;
  transform: translate(-100%, -50%);
}
</style>