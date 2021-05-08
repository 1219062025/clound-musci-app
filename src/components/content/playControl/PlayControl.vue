<template>
  <div id="control">
    <audio
      :src="audio.audioUrl"
      ref="audio"
    ></audio>
    <div
      class="info"
      @click="popup"
    >
      <img
        class="pic"
        :src="audio.pic"
        :class="{route: isplayed, pause: !isplayed}"
      >
      <div class="single">{{audio.name}}
        <span
          class="tns"
          v-if="audio.tns"
        >({{audio.tns}})</span>
        <span class="name"> - {{audio.artists}}</span>
      </div>
    </div>

    <div class="btn">
      <span
        class="indicator"
        @click="playSwitch"
      >
        <span
          class="icon play"
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
      <span
        class="icon list"
        @click="cls"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayControl",
  data() {
    return {
      audio: {},
      isplayed: false,
      icon: "",
      // 音频总时长
      duration: 0,
      // 音频已播放时长
      currentTime: 0,
    };
  },
  methods: {
    // 播放/暂停
    playSwitch() {
      if (this.$refs.audio.currentSrc && this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$refs.play.innerText = "";
      } else {
        this.$refs.audio.pause();
        this.$refs.play.innerText = "";
      }
    },
    cls() {},
    popup() {
      this.$emit("popup");
    },
  },
  computed: {
    // 音频当前播放时长映射element进度条组件的百分比
    percentage() {
      return Math.round((this.currentTime / this.duration) * 100);
    },
  },
  created() {
    this.audio = this.$store.state.audio;
  },
  mounted() {
    this.$bus.$on("play", () => {
      setTimeout(() => {
        console.log(this.$refs.audio.currentSrc);
        this.$refs.audio.play();
        this.$refs.play.innerText = "";
      }, 500);
    });
    // 侦听音频事件
    const audio = this.$refs.audio;
    // 音频播放
    audio.addEventListener("play", () => {
      this.isplayed = true;
    });
    // 音频暂停
    audio.addEventListener("pause", () => {
      this.isplayed = false;
    });
    // 音频总时长变动
    audio.addEventListener("durationchange", () => {
      this.duration = this.$refs.audio.duration;
    });
    // 音频已播放时间变动
    audio.addEventListener("timeupdate", () => {
      this.currentTime = this.$refs.audio.currentTime;
    });
    audio.addEventListener("ended", () => {
      this.isplayed = false;
    });
  },
};
</script>

<style scoped>
#control {
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 49px;
  padding: 0 15px;
  border-top: 1px solid #e7e7e7;
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
.route {
  animation: played 18s linear infinite;
}
.pause {
  animation: played 18s linear infinite paused;
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
@keyframes played {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>