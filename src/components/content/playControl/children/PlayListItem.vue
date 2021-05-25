<template>
  <div id="list-item">
    <div
      class="infos"
      :class="{played: played(song.id)}"
      @click="$emit('play')"
    >
      <div class="name">{{song.name}}<span v-if="song.alia">({{song.alia}})</span><span
          class="artists"
          :class="{played: played(song.id)}"
        >- {{song.artists}}</span></div>
    </div>
    <div
      class="iconfont icon-guanbi"
      @click="$emit('remove')"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PlayListItem",
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    played() {
      return function (id) {
        return this.$store.state.audio.id === id ? true : false;
      };
    },
  },
};
</script>

<style scoped>
#list-item {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}
.infos {
  flex: 1;
  width: 0;
}
.infos > div {
  /* 先强制一行内显示文本，默认值normal会自动换行 */
  white-space: nowrap;
  /* 超出的部分隐藏 */
  overflow: hidden;
  /* 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
}
.name {
  font-size: 18px;
}
.artists {
  margin-left: 5px;
  font-size: 12px;
  color: #818181;
}
.icon-guanbi {
  color: #818181;
}
.played {
  color: red;
}
</style>