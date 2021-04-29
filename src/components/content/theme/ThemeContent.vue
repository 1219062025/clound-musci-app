<template>
  <div id="theme-content">
    <theme-swiper
      class="swiper"
      :theme-list='netWorkData'
      width='120px'
    ></theme-swiper>
  </div>
</template>

<script>
import ThemeSwiper from "./ThemeSwiper";

export default {
  name: "ThemeContent",
  props: {
    netWorkData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    ThemeSwiper,
  },
};
</script>

<style scoped>
#theme-content {
  padding: 10px 0;
}
.swiper >>> img {
  border-radius: 12px;
}
</style>
