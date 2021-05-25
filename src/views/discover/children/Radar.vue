<template>
  <div id="radar">
    <theme-title :title="radarTitle"></theme-title>
    <theme-content :net-work-data="radarList"></theme-content>
  </div>
</template>

<script>
import ThemeTitle from "components/content/theme/ThemeTitle";
import ThemeContent from "components/content/theme/ThemeContent";

import { getDiscover } from "network/discover";
export default {
  name: "Radar",
  data() {
    return {
      radarTitle: "",
      radarList: [],
    };
  },
  components: {
    ThemeTitle,
    ThemeContent,
  },
  // return creative.resources.map((item) => {
  //   const ui = item.uiElement;
  //   return {
  //     // 雷达歌单名
  //     name: ui.mainTitle.title,
  //     // 歌单封面
  //     pic: ui.image.imageUrl,
  //   };
  // });
  mounted() {
    getDiscover().then((discoverData) => {
      console.log("111", discoverData);
      const dataMode = discoverData.data.data.blocks;
      this.radarTitle = dataMode[4].uiElement.subTitle.title;
      this.radarList = dataMode[4].creatives.map((creative) => {
        const ui = creative.resources[0].uiElement;
        return {
          // 雷达歌单名
          name: ui.mainTitle.title,
          // 歌单封面
          pic: ui.image.imageUrl,
          // 播放量
          playCount: creative.resources[0].resourceExtInfo.playCount,
        };
      });
    });
  },
};
</script>

<style scoped>
</style>