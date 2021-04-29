<template>
  <div id="random-songs">
    <theme-title
      :title="songListTitle"
      btn=" 播放"
    ></theme-title>
    <swiper
      v-if="songList.length"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="(item1, index) in songList"
        :key="index"
      >
        <div
          v-for="(item2, indey) in item1"
          :key="indey"
          class="content"
        >
          <img :src="item2.img">
          <div class="info">
            <p class="title">{{item2.name}}</p>
            <p class="flag">{{item2.flag}}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import ThemeTitle from "components/content/theme/ThemeTitle";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import { getDiscover } from "network/discover";

export default {
  name: "RandomSongs",
  data() {
    return {
      songListTitle: "",
      songList: [],
      swiperOption: {},
    };
  },
  components: {
    ThemeTitle,
    swiper,
    swiperSlide,
  },
  mounted() {
    getDiscover().then((discoverData) => {
      const dataMode = discoverData.data.data.blocks;
      // 获得随机歌曲列表标题
      this.songListTitle = dataMode[2].uiElement.subTitle.title;
      /* 获取随机歌曲数据：
          数据为一个数组，数据里面又有四个数组(对应每一行)，每个数组里面都有三个歌曲数据对象
          (4) [Array(3), Array(3), Array(3), Array(3), __ob__: Observer]
              ：0: (3) [{…}, {…}, {…}, __ob__: Observer]
              ：1: (3) [{…}, {…}, {…}, __ob__: Observer]
              ：2: (3) [{…}, {…}, {…}, __ob__: Observer]
              ：3： (3) [{…}, {…}, {…}, __ob__: Observer]
      */
      this.songList = dataMode[2].creatives.map((creative) => {
        return creative.resources.map((item) => {
          const ui = item.uiElement;
          return {
            // 歌名
            name: ui.mainTitle.title,
            // 歌曲图片
            img: ui.image.imageUrl,
            // 标志信息(例如：超过72%人播放)，有些歌曲没有标志信息
            flag: ui.subTitle ? ui.subTitle.title : "",
            // 歌手名，艺术家名
            artist: item.resourceExtInfo.artists.map((artist) => artist.name),
          };
        });
      });
    });
  },
};
</script>

<style scoped>
.swiper-container {
  padding-left: 15px;
  height: 180px;
}
.content {
  display: flex;
  padding: 5px 0;
}

.content img {
  width: 50px;
  border-radius: 10px;
}
.content .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}
.content .info .title {
  font-size: 14px;
}
.content .info .flag {
  margin-top: 5px;
  font-size: 12px;
  color: #c6c7c6;
}
</style>