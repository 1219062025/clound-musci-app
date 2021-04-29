<template>
  <swiper
    v-if="themeList.length"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(item, index) in themeList"
      :key="index"
    >
      <img
        :src="item.pic"
        :style="{width: width}"
      >
      <span class="play-count icon"> {{playCount(item.playCount)}}</span>
      <p class="name">{{item.name}}</p>
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "ThemeSwiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    width: {
      type: String,
      default: "100%",
    },
    themeList: {
      type: Array,
      default() {
        return [];
      },
    },
    swiperOption: {
      type: Object,
      default() {
        return {
          freeMode: true,
          slidesPerView: "auto",
          spaceBetween: 10,
          slidesOffsetBefore: 12,
          slidesOffsetAfter: 12,
        };
      },
    },
  },
  computed: {
    playCount() {
      // 通过计算属性计算歌单播放量
      return function (playCount) {
        if (playCount >= 1.0e4) {
          return (playCount * 1.0e-4).toFixed(0) + "万";
        } else if (playCount >= 1.0e8) {
          return (playCount * 1.0e-8).toFixed(1) + "亿";
        }
      };
    },
  },
};
</script>

<style scoped>
.swiper-slide {
  position: relative;
  width: 120px;
}
.play-count {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 10px;
  border-radius: 10px;
  background: rgba(91, 114, 145, 0.5);
  color: #fff;
  font-size: 12px;
}
.name {
  font-size: 12px;
  padding-right: 20px;
  padding-left: 5px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一块元素显示的文本的行数 */
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
</style>
