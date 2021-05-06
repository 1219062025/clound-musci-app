<template>
  <div id="discove-list">
    <swiper
      v-if="ballData.length"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="(item, index) in ballData"
        :key="index"
      >
        <img
          :src="item.iconUrl"
          @load="imgLoad"
        >
        <p class="name">{{item.name}}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "DiscoverList",
  data() {
    return {
      isLoad: false,
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    ballData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$bus.$emit("imgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
#discove-list {
  padding: 10px 0;
}
.swiper-slide {
  position: relative;
  width: 45px;
  height: 65px;
}
.swiper-slide img {
  width: 100%;
  color: #fa7484;
  border-radius: 50%;
  background: #fa7484;
}
.name {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;
  text-align: center;
  font-size: 12px;
}
</style>