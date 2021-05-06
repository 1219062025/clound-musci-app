<template>
  <div id="discover">
    <!-- 顶部导航栏 -->
    <top-nav-bar>
      <template #left>
        <p class="icon"></p>
      </template>
      <template #right>
        <p class="icon"></p>
      </template>
    </top-nav-bar>
    <scroll
      class="scroll"
      ref="myScroll"
    >
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
    </scroll>
  </div>
</template>

<script>
// 子组件
import TopNavBar from "components/content/topNavBar/TopNavBar";
import Personalized from "./children/Personalized";
import DiscoverList from "./children/DiscoverList";
import RandomSongs from "./children/RandomSongs";
import Radar from "./children/Radar";
import MusicCalendar from "./children/MusicCalendar";

// 绝对公共组件
import Scroll from "components/common/scroll/Scroll";
// 项目公共组件
import BannerSwiper from "components/content/bannerSwiper/BannerSwiper";

// 网络请求
import { getDiscover, getBall } from "network/discover";

// 防抖函数
import { debounce } from "common/utils";

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
    Scroll,
    BannerSwiper,
    DiscoverList,
    Personalized,
    RandomSongs,
    Radar,
    MusicCalendar,
  },
  mounted() {
    const refresh = debounce(this.$refs.myScroll.refresh, 500);
    this.$bus.$on("imgLoad", refresh);
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
      this.$router.push({ path: "/search" });
    },
  },
};
</script>

<style scoped>
#discover {
  height: 100vh;
}
.scroll {
  height: calc(100% - 70px);
}
</style>