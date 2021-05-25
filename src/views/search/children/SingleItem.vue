<template>
  <div id="single-song">
    <div
      ref="infos"
      @click="$emit('play', song)"
    >
      <p class="name">{{song.name}} <span
          v-if="song.tns"
          class="tns"
        >({{song.tns}})</span></p>
      <p class="artist">
        <span class="flag">
          <span
            v-if="song.vip == 8"
            class="vip"
          >VIP</span>
          <span
            v-if="song.original === 1"
            class="original"
          >原唱</span>
          <span
            v-if="song.maxbr >= 999000"
            class="maxbr"
          >SQ</span>
        </span>
        {{song.artists}} - {{song.album.name}}
      </p>
      <p
        v-if="song.alia"
        class="alia"
      >{{song.alia}}</p>
    </div>
    <div class="btn">
      <span
        v-if="song.mv !== 0"
        class="icon play"
      ></span>
      <span class="icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleItem",
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
#single-song {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e7;
}
.name {
  width: 16em;
  font-size: 18px;
}
.artist,
.alia {
  display: flex;
  align-items: center;
  position: relative;
  width: 20em;
  color: #818181;
  font-size: 14px;
  margin-top: 5px;
}
.name,
.artist,
.alia {
  /* 先强制一行内显示文本，默认值normal会自动换行 */
  white-space: nowrap;
  /* 超出的部分隐藏 */
  overflow: hidden;
  /* 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
}
.tns,
.btn {
  color: #818181;
}
.flag {
  display: flex;
}
.original,
.maxbr,
.vip {
  display: inline-block;
  margin-right: 3px;
  font-size: 8px;
  padding: 1px 2px;
  border-radius: 0.3em;
}
.original {
  color: #fff;
  background: red;
}
.maxbr,
.vip {
  color: red;
  border: 1px solid red;
  padding: 0 1px;
}
.play {
  margin-right: 1.5em;
}
</style>