<template>
  <div id="single">
    <div></div>
    <scroll
      class="scroll"
      ref="myScroll"
      :pull-up-load="true"
      @pullingUp="upLoad"
    >
      <single-item
        v-for="(item, index) in songs"
        :key="index"
        :song="item"
        @play="play"
        ref="single"
      ></single-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import SingleItem from "./SingleItem";

import { getSearchData, getSingle, getLyric } from "network/search";

import { PLAY } from "@/store/mutations-types";
export default {
  name: "Single",
  data() {
    return {
      // 获取到的所有歌曲
      songs: [],
      // 获取歌曲数据函数
      loadData: () => {},
      // 获取到的歌曲数据页偏移量，一页最多有30首歌曲数据
      offset: 0,
      // 当前播放中的歌曲
      activeSingle: {},
    };
  },
  components: {
    Scroll,
    SingleItem,
  },
  methods: {
    upLoad() {
      this.loadData(this.$route.query.queryString, this.offset);
      this.$refs.myScroll.finishPullUp();
    },
    play(single) {
      // 如果点击的歌曲不是当前播放的就继续执行代码
      if (this.activeSingle !== single) {
        this.activeSingle = single;
        let olyric = "",
          tlyric = "";
        getLyric(single.id).then((result) => {
          // 获取歌词原文
          olyric = result.data.hasOwnProperty("lrc")
            ? result.data.lrc.lyric
            : "";
          tlyric =
            result.data.hasOwnProperty("tlyric") &&
            result.data.tlyric.lyric.length > 10
              ? result.data.tlyric.lyric
              : "";
          // 获取歌曲相关信息
          getSingle(single.id).then((result) => {
            this.$store.commit({
              type: PLAY,
              url: result.data.data[0].url,
              id: result.data.data[0].id,
              // 歌曲是否未登录、非会员的用户只能试听
              freeTrialInfo: result.data.data[0].freeTrialInfo,
              single,
              lyric: {
                olyric,
                tlyric,
              },
            });
          });
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
              // 歌曲时长/ms
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
            };
          })
        );
        this.$nextTick(() => {
          // 找到搜索关键字，将其颜色替换
          const res = new RegExp(this.$route.query.queryString, "g");
          for (const item of this.$refs.single) {
            item.$refs.infos.innerHTML = item.$refs.infos.innerHTML.replace(
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
</style>