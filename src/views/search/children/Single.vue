<template>
  <div id="single">

    <div></div>
    <scroll
      class="scroll"
      ref="myScroll"
      :pull-up-load="true"
      @pullingUp="upLoad"
    >
      <div
        v-for="(item, index) in songs"
        :key="index"
        class="info"
      >
        <div ref="infos">
          <p class="name">{{item.name}} <span v-if="item.tns">({{item.tns}})</span></p>
          <p class="artist">
            <span class="flag">
              <span
                v-if="item.vip == 8"
                class="vip"
              >VIP</span>
              <span
                v-if="item.original === 1"
                class="original"
              >原唱</span>
              <span
                v-if="item.maxbr >= 999000"
                class="maxbr"
              >SQ</span>
            </span>
            {{item.artists}} - {{item.album.name}}
          </p>
          <p
            v-if="item.alia"
            class="alia"
          >{{item.alia}}</p>
        </div>
        <div class="btn">
          <span></span>
          <span class="icon"></span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { getSearchData } from "network/search";
export default {
  name: "Single",
  data() {
    return {
      songs: [],
      offset: 0,
      loadData: () => {},
    };
  },
  components: {
    Scroll,
  },
  methods: {
    upLoad() {
      this.loadData(this.$route.query.queryString, this.offset);
      this.$refs.myScroll.finishPullUp();
    },
  },
  mounted() {
    this.loadData = function (keywords, offset) {
      getSearchData(keywords, offset).then((result) => {
        const songList = result.data.result.songs;
        this.songs = this.songs.concat(
          songList.map((song) => {
            console.log(song.originCoverType);
            return {
              // 歌曲名
              name: song.name,
              // 专辑名
              album: song.al,
              // 歌手名
              artists: song.ar.map((artist) => artist.name).join("/"),
              // 歌曲时长
              duration: song.dt,
              // 额外描述
              alia: song.alia.join("/"),
              // 歌曲说明
              tns: song.tns ? song.tns.join("/") : "",
              // 是否原唱
              original: song.originCoverType,
              // 是否有无损音质
              maxbr: song.privilege.downloadMaxbr,
              // 是否需要VIP才能下载
              vip: song.privilege.fee,
            };
          })
        );
        this.$nextTick(() => {
          const res = new RegExp(this.$route.query.queryString, "g");
          for (const item of this.$refs.infos) {
            item.innerHTML = item.innerHTML.replace(
              res,
              "<span style='color: #6a9fbb;'>" +
                this.$route.query.queryString +
                "</span>"
            );
          }
          this.$refs.myScroll.refresh();
          this.offset++;
        });
      });
    };
    this.loadData(this.$route.query.queryString, this.offset);
  },
};
</script>
<style scoped>
#single {
  height: calc(100vh - 94px);
  overflow: hidden;
}
.scroll {
  height: 100%;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e7;
}
.name {
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
  /* 先强制一行内显示文本，默认值normal会自动换行 */
  white-space: nowrap;
  /* 超出的部分隐藏 */
  overflow: hidden;
  /* 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
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
</style>