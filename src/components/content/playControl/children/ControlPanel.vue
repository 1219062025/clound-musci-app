<template>
  <div id="control-panel">
    <!-- 背景图片 -->
    <div
      class="bg"
      :style="{background: bodyImg}"
    ></div>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <!-- 返回按钮 -->
        <span
          class="iconfont icon-xiala back"
          @click="close"
        ></span>
        <!-- 歌曲名、歌手名 -->
        <div class="title">
          <div class="song-name">{{audio.name ? audio.name : "请选择歌曲播放"}}</div>
          <div class="name">{{audio.artists ? audio.artists : ""}}</div>
        </div>
        <!-- 分享 -->
        <span class="iconfont icon-fenxiang share"></span>
      </div>
      <!-- 歌曲图片区 -->
      <div
        class="body"
        @click="cutLyric"
      >
        <lyric
          v-show="isLyric"
          :lyric="audio.lyric"
          @cutLyric="cutLyric"
        ></lyric>
        <div
          class="wrap"
          :class="{lucency: isLyric}"
        ></div>
        <div
          class="img"
          :class="{lucency: isLyric}"
        >
          <img
            v-if="audio.pic"
            :src="audio.pic"
            :class="{route: $store.state.isPlayed, pause: !$store.state.isPlayed}"
          >
        </div>
      </div>
      <!-- 播放控制区 -->
      <div class="instrument">
        <!-- 互动按钮 -->
        <div class="interaction">
          <span class="iconfont icon-xihuan"></span>
          <span class="iconfont icon-tubiaozhizuomoban"></span>
          <span class="iconfont icon-yichang"></span>
          <span class="iconfont icon-pinglun"></span>
          <span class="iconfont icon-more"></span>
        </div>
        <!-- 播放进度 -->
        <div class="progress">
          <span class="currentTime">{{formatTime(audio.currentTime)}}</span>
          <input
            type="range"
            :max="audio.duration"
            :value="value"
            @input="input"
            @change="change"
            id="range"
            ref="range"
          >
          <span class="jd">
            <span
              class="jd-range"
              :style="{width: lapses}"
              ref="jrange"
            ><span class="btn"></span></span>
          </span>
          <span class="duration">{{formatTime(audio.duration)}}</span>
        </div>
        <!-- 控制按钮 -->
        <div class="control">
          <span
            class="iconfont"
            :class="mode"
            @click="modeChange"
          ></span>
          <span
            class="iconfont icon-shangyishoushangyige"
            @click="switchSong('prev')"
          ></span>
          <span
            class="iconfont"
            :class="{'icon-bofang': !$store.state.isPlayed, 'icon-bofang1': $store.state.isPlayed}"
            @click="$emit('playSwitch')"
          ></span>
          <span
            class="iconfont icon-xiayigexiayishou"
            @click="switchSong('next')"
          ></span>
          <span
            class="iconfont icon-bofangliebiao"
            @click="drawer_list = true"
          ></span>
        </div>
      </div>
      <el-drawer
        :visible.sync="drawer_list"
        :modal="false"
        :with-header="false"
        custom-class="drawer-class"
        direction="btt"
        size="75vh"
      >
        <play-list :opened="drawer_list"></play-list>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Lyric from "./Lyric";
import PlayList from "components/content/playControl/children/PlayList";

export default {
  name: "ControlPanel",
  data() {
    return {
      audio: {},
      newTime: 0,
      isChange: false,
      isLyric: false,
      drawer_list: false,
    };
  },
  components: {
    Lyric,
    PlayList,
  },
  computed: {
    bodyImg() {
      return `url(${this.audio.pic}) center`;
    },
    // 表面上显示出来的进度条的宽度
    lapses() {
      return !this.isChange
        ? Math.ceil((this.audio.currentTime / this.audio.duration) * 100) + "%"
        : Math.ceil((this.newTime / this.audio.duration) * 100) + "%";
    },
    // range的值
    value() {
      return !this.isChange ? this.audio.currentTime : this.newTime;
    },
    // 格式化时间
    formatTime() {
      return function (time) {
        const minute = Number.parseInt(time / 60);
        const second = Number.parseInt(time % 60);
        return `${minute < 10 ? "0" : ""}${minute}:${
          second < 10 ? "0" : ""
        }${second}`;
      };
    },
    mode() {
      switch (this.$store.state.playMode) {
        case 0:
          return { "icon-xunhuan": true };
        case 1:
          return { "icon-hanhan-01-01": true };
        case 2:
          return { "icon-xunhuanbofang": true };
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
      this.isLyric = false;
    },
    // 拖动range时暂停计算属性获取range值
    input() {
      this.isChange = true;
      // 这里用newTime间接获取value的值是因为，这样计算属性才能观察得到值的变化
      this.newTime = this.$refs.range.value;
    },
    // 拖动range放手后触发播放位置改变事件
    change() {
      this.$emit("change", this.$refs.range.value);
      this.isChange = false;
    },
    cutLyric() {
      this.isLyric = !this.isLyric;
      this.$children[0].$emit("refresh");
    },
    switchSong(str) {
      const playList = this.$store.state.playList;
      let prevSong = {};
      let nextSong = {};
      for (let i = 0; i < playList.length; i++) {
        if (this.$store.state.audio.id === playList[i].id) {
          prevSong = playList[i - 1 < 0 ? playList.length - 1 : i - 1];
          nextSong = playList[(i + 1) % playList.length];
        }
      }
      switch (str) {
        case "prev": {
          if (prevSong !== this.$store.state.audio)
            this.$store.state.audio = prevSong;
          break;
        }
        case "next": {
          if (nextSong !== this.$store.state.audio)
            this.$store.state.audio = nextSong;
          break;
        }
      }
    },
    modeChange() {
      this.$store.state.playMode = (this.$store.state.playMode + 1) % 3;
    },
  },
  watch: {
    "$store.state.audio": {
      handler(val) {
        this.audio = val;
      },
      deep: true,
    },
  },
  mounted() {
    this.audio = this.$store.state.audio;
  },
};
</script>

<style scoped>
#control-panel {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
}
.bg {
  float: left;
  background-size: cover !important;
  filter: blur(30px);
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(117, 112, 112, 0.4);
}
.header {
  display: flex;
  width: 100%;
  height: 44px;
  justify-content: space-around;
  align-items: center;
}
.title {
  display: flex;
  width: 200px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.song-name {
  font-size: 20px;
}
.name {
  font-size: 14px;
  color: #cac5c5;
}
.iconfont {
  font-size: 25px;
}
.body {
  position: relative;
  width: 100%;
  height: calc(100% - 219px);
}
.body img {
  width: 100%;
}
.img,
.img img {
  position: absolute;
  inset: 0;
  margin: auto;
  border-radius: 50%;
}
.img {
  width: 320px;
  height: 320px;
  background: url("~assets/img/wrap.jpg") center center;
  background-size: cover;
}
.img img {
  width: 70%;
}
.wrap {
  position: absolute;
  box-sizing: content-box;
  inset: 0;
  margin: auto;
  width: 320px;
  height: 320px;
  border: 15px solid rgba(44, 38, 39, 0.2);
  border-radius: 50%;
}
.lucency {
  opacity: 0;
}
.interaction {
  display: flex;
  justify-content: space-around;
}
.interaction .iconfont {
  font-size: 28px;
}
.progress {
  position: relative;
  height: 18px;
  margin-top: 30px;
  padding: 0 20px;
}
.progress > * {
  position: absolute;
}
.progress .currentTime,
.progress .duration {
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
}
.progress .currentTime {
  left: 10px;
}
.progress .duration {
  right: 10px;
}
#range,
.jd {
  top: 50%;
  width: 80%;
  height: 3px;
  transform: translateY(-50%);
}
#range {
  position: absolute;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  opacity: 0;
}
.jd {
  left: 10%;
  background: #6d6b6c;
}
.jd-range {
  position: absolute;
  width: 100px;
  height: 3px;
  background: #b9afaf;
}
.jd-range .btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
}
.control {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
}
.control .iconfont {
  display: flex;
  align-items: center;
}
.icon-bofang,
.icon-bofang1 {
  font-size: 60px;
}
</style>