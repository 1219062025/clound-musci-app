<template>
  <div>
    <!-- 顶部导航栏 -->
    <top-nav-bar></top-nav-bar>
    <!-- 轮播图 -->
    <banner-swiper
      class="swiper"
      :banner='banner'
    ></banner-swiper>
    <!-- 发现页面圆形按钮列表 -->
    <discover-list :ball-data="ball"></discover-list>
    <!-- 推荐歌单 -->
    <personalized></personalized>
    <div class="rail"></div>
    <!-- 随机歌曲列表 -->
    <random-songs></random-songs>
    <div class="rail"></div>
    <!-- 用户雷达歌单 -->
    <radar></radar>
    <div class="rail"></div>
    <music-calendar></music-calendar>
    <h2 @click="test">Discover</h2>
  </div>
</template>

<script>
// 子组件
import TopNavBar from "./children/TopNavBar";
import Personalized from "./children/Personalized";
import DiscoverList from "./children/DiscoverList";
import RandomSongs from "./children/RandomSongs";
import Radar from "./children/Radar";
import MusicCalendar from "./children/MusicCalendar";

// 绝对公共组件
import BannerSwiper from "components/content/bannerSwiper/BannerSwiper";

// 网络请求
import { getBanner, getDiscover, getBall } from "network/discover";

export default {
  name: "Discover",
  data() {
    return {
      banner: [],
      ball: [],
    };
  },
  components: {
    TopNavBar,
    BannerSwiper,
    DiscoverList,
    Personalized,
    RandomSongs,
    Radar,
    MusicCalendar,
  },
  mounted() {
    getDiscover().then((discoverData) => {
      const dataMode = discoverData.data.data.blocks;
      // 获得轮播图数据中的图片数据
      this.banner = dataMode[0].extInfo.banners.map((item) => {
        return {
          pic: item.pic,
          titleColor: item.titleColor,
          typeTitle: item.typeTitle,
        };
      });
    });
    // 获得发现页面圆形图标列表数据
    getBall().then((ballData) => {
      this.ball = ballData.data.data;
    });
  },
  methods: {
    test() {
      console.log("测试");
    },
  },
};
</script>

<style scoped>
</style>