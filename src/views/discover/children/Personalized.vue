<template>
  <div id="personalized">
    <theme-title title="推荐歌单" />
    <theme-content :net-work-data="dataList"></theme-content>
  </div>
</template>

<script>
import ThemeTitle from "components/content/theme/ThemeTitle";
import ThemeContent from "components/content/theme/ThemeContent";

import { getPersonalized } from "network/discover";

export default {
  // 推荐歌单
  name: "Personalized",
  data() {
    return {
      getPersonalized,
      dataList: [],
    };
  },
  components: {
    ThemeTitle,
    ThemeContent,
  },

  mounted() {
    getPersonalized(6).then((requestData) => {
      this.dataList = requestData.data.result.map((item) => {
        return {
          name: item.name,
          pic: item.picUrl,
          playCount: item.playCount,
        };
      });
    });
  },
};
</script>

<style scoped>
#personalized {
  padding-top: 15px;
  padding-right: 0;
  border-top: 1px solid #e5e7e4;
}
</style>