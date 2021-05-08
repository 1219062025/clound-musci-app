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
        <div
          ref="infos"
          @click="play(item)"
        >
          <p class="name">{{item.name}} <span
              v-if="item.tns"
              class="tns"
            >({{item.tns}})</span></p>
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
          <span
            v-if="item.mv !== 0"
            class="icon play"
          ></span>
          <span class="icon"></span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { getSearchData, getSingleUrl } from "network/search";

import { PLAY } from "@/store/mutations-types";
export default {
  name: "Single",
  data() {
    return {
      songs: [],
      offset: 0,
      loadData: () => {},
      isSingle: {},
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
    play(single) {
      if (this.isSingle !== single) {
        this.isSingle = single;
        getSingleUrl(single.id).then((result) => {
          this.$store.commit({
            type: PLAY,
            url: result.data.data[0].url,
            single,
          });
          this.$bus.$emit("play");
        });
      }
    },
  },
  mounted() {
    this.loadData = function (keywords, offset) {
      getSearchData(keywords, offset).then((result) => {
        const songList = result.data.result.songs;
        this.songs = this.songs.concat(
          songList.map((song) => {
            return {
              // 歌曲id
              id: song.id,
              // 歌曲名
              name: song.name,
              // 专辑名
              album: song.al,
              // 歌手名
              artists: song.ar.map((artist) => artist.name).join("/"),
              // 歌曲时长
              duration: song.dt,
              // 歌曲图片
              pic: song.al.picUrl,
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
              // 是否有MV
              mv: song.mv,
              // 歌曲持续时间
              dt: song.dt,
            };
          })
        );
        this.$nextTick(() => {
          // 找到搜索关键字，将其颜色替换
          const res = new RegExp(this.$route.query.queryString, "g");
          for (const item of this.$refs.infos) {
            item.innerHTML = item.innerHTML.replace(
              res,
              "<span style='color: #2b59a3;'>" +
                this.$route.query.queryString +
                "&nbsp;" +
                "</span>"
            );
          }
          // 刷新BScroll
          this.$refs.myScroll.refresh();
          // 获取到的歌曲数据页数偏移量加一，准备下次刷新新的歌曲数据进来
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
  height: calc(100vh - 143px);
  overflow: hidden;
}
.scroll {
  height: 100%;
}
.info {
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