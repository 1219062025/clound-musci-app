<template>
  <!-- 当轮播图的数据已经请求过来之后再渲染 -->
  <swiper
    v-if="banner.length"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(item, index) in banner"
      :key="index"
    >
      <img :src="item.pic">
      <span
        class="flag"
        :style="{background: item.titleColor}"
      >{{item.typeTitle}}</span>
    </swiper-slide>
    <template #pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "BannerSwiper",
  data() {
    return {
      swiperOption: {
        loop: true,
        observer: true,
        observeParents: true,
        spaceBetween: 30,
        autoplay: {
          disableOnInteraction: false,
        },
        // 显示分页器
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "discover-bullet",
          bulletActiveClass: "discover-bullet-active",
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    banner: {
      type: Array,
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  border-radius: 15px;
}
.flag {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 3px 8px;
  font-size: 14px;
  color: #fff;
  border-top-left-radius: 13px;
}
.swiper-container {
  width: 95%;
  margin: 20px auto;
  border-radius: 15px;
}
</style>
