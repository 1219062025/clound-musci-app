<template>
  <div id="list">
    <h3>当前播放&nbsp;<span>({{$store.state.playList.length ? $store.state.playList.length : "0"}})</span></h3>
    <scroll
      class="scroll"
      ref="myScroll"
    >
      <play-list-item
        v-for="(item, index) in $store.state.playList"
        :key="index"
        :song="item"
        @play="play(item)"
        @remove="remove(item.id, index)"
      ></play-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import PlayListItem from "./PlayListItem";
export default {
  name: "PlayList",
  components: {
    PlayListItem,
    Scroll,
  },
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    opened() {
      this.$refs.myScroll.refresh();
    },
  },
  methods: {
    play(song) {
      this.$store.state.audio = song;
    },
    remove(id, index) {
      const playList = this.$store.state.playList;
      if (id === this.$store.state.audio.id) {
        this.$store.state.audio = playList[(index + 1) % playList.length];
        playList.splice(index, 1);
      } else {
        playList.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
#list {
  position: relative;
  color: #000;
  width: 100%;
  height: 75vh;
  border-radius: 10px;
  padding: 0 20px 10px 15px;
  background: #fff;
}
.scroll {
  width: 100%;
  height: calc(100% - 51px);
}
span {
  font-size: 12px;
  color: #818181;
}
h3 {
  position: relative;
  z-index: 1;
  padding-top: 20px;
  padding-bottom: 10px;
  background: #fff;
}
</style>