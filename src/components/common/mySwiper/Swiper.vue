<template>
  <swiper
    :options="swiperOption"
    ref="mySwiper"
  >
    <swiper-slide
      v-for="(item, index) in banner"
      :key="index"
    >
      <img
        :src="item.pic"
        :style="{width: width}"
      >
      <span class="view-count icon"> 143万</span>
      <span
        v-if="flag"
        class="flag"
        :style="{background: item.titleColor}"
      >{{item.typeTitle}}</span>
    </swiper-slide>
    <template #pagination>
      <div
        class="swiper-pagination"
        v-if="pagination"
      ></div>
    </template>
    <template #scrollbar>
      <div
        class="swiper-scrollbar"
        v-if="scrollbar"
      ></div>
    </template>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "Swiper",
  data() {
    return {
      swiper: {},
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    swiperOption: {
      type: Object,
      default() {
        return {
          loop: true,
          // 自动播放
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          // 显示分页
          pagination: {
            el: ".swiper-pagination",
          },
          // 显示滚动条
          scrollbar: {
            el: ".swiper-scrollbar",
          },
        };
      },
    },
    banner: {
      type: Array,
      default() {
        return ["slide1", "slide2", "slide3", "slide4"];
      },
    },
    width: {
      type: String,
      default: "100%",
    },
    flag: {
      type: Boolean,
      default: false,
    },
    // 分页器是否渲染
    pagination: {
      type: Boolean,
      default: true,
    },
    // 滚动条是否渲染
    scrollbar: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.swiper = this.$refs.mySwiper.swiper;
  },
};
</script>

<style scoped>
</style>
