<template>
  <div id="search">
    <top-nav-bar>
      <template #left>
        <p
          class="icon"
          @click="back"
        ></p>
      </template>
    </top-nav-bar>
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in tabList"
        :key="index"
        :class="{active: isActive === index}"
        @click.native="changeTab(index, item.link)"
      >
        {{item.name}}
      </swiper-slide>
    </swiper>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavBar from "components/content/topNavBar/TopNavBar";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Search",
  data() {
    return {
      isActive: 0,
      query: {},
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      tabList: [
        { name: "综合", link: "synthesize" },
        { name: "单曲", link: "single" },
        { name: "歌单", link: "single" },
        { name: "视频", link: "single" },
        { name: "歌手", link: "single" },
        { name: "播单", link: "single" },
        { name: "歌词", link: "single" },
        { name: "专辑", link: "single" },
        { name: "声音", link: "single" },
        { name: "云圈", link: "single" },
        { name: "用户", link: "single" },
      ],
    };
  },
  methods: {
    changeTab(index, link) {
      this.isActive = index;
      this.$router.push({
        name: link,
        query: this.$route.query,
      });
    },
    back() {
      this.$router.push("/");
    },
  },
  components: {
    TopNavBar,
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped>
.swiper-slide {
  width: 2em;
  color: #7e7b7b;
}
.active::after {
  content: "";
  display: block;
  bottom: 0.1em;
  width: 100%;
  height: 6px;
  border-radius: 0.2em;
  background: #fd475c;
}
</style>