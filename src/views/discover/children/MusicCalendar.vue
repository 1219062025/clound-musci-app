<template>
  <div id="music-calendar">
    <theme-title
      :title="calendarTitle"
      :btn="buttonText"
    ></theme-title>
    <div
      class="content"
      v-for="(item, index) in calendarList"
      :key="index"
    >
      <div class="info">
        <div class="title">
          {{item.time}}
          <span
            v-if="item.flag !== ''"
            class="flag"
          >{{item.flag}}</span>
        </div>
        <div class="text">{{item.text}}</div>
      </div>
      <div
        v-if="item.count"
        class="remind"
      >
        <!-- <span class="icon"></span> -->
        <el-button
          size="small"
          icon="el-icon-alarm-clock"
          circle
        ></el-button>
        <p>{{item.count}}</p>
      </div>
      <img
        :src="item.pic"
        @load="imgLoad"
      >
    </div>
  </div>
</template>

<script>
import ThemeTitle from "components/content/theme/ThemeTitle";

import { getDiscover } from "network/discover";
export default {
  name: "MusicCalendar",
  data() {
    return {
      calendarTitle: "",
      calendarList: [],
      buttonText: "",
    };
  },
  components: {
    ThemeTitle,
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoad");
    },
  },
  mounted() {
    getDiscover().then((discoverData) => {
      const dataMode = discoverData.data.data.blocks;
      // 模块标题
      this.calendarTitle = dataMode[5].uiElement.subTitle.title;
      // 按钮文本
      this.buttonText = dataMode[5].uiElement.button.text + " ";
      this.calendarList = dataMode[5].creatives.map((creative) => {
        const ui = creative.resources[0].uiElement;
        const nTime = new Date();
        const eTime = new Date(creative.resources[0].resourceExtInfo.endTime);
        let time =
          eTime.getFullYear() > nTime.getFullYear() ||
          eTime.getMonth() > nTime.getMonth() ||
          eTime.getDate() > nTime.getDate()
            ? "明天"
            : "今天";
        return {
          // 事项文本
          text: ui.mainTitle.title,
          // 事项封面
          pic: ui.image.imageUrl,
          // 标志
          flag: ui.labelTexts ? ui.labelTexts[0] : "",
          // 事项时间
          time,
          // 预约提醒事项数
          count: creative.resources[0].resourceExtInfo.subCount,
        };
      });
    });
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-top: 1px solid #e6e6e6;
}
img {
  width: 50px;
  border-radius: 10px;
  flex: 0 1 50px;
}
.info .title {
  color: #9b9d9a;
  font-size: 14px;
  margin-bottom: 5px;
}
.info .flag {
  font-size: 10px;
  padding: 2px 4px;
  background: #fff9e5;
  color: #e9a200;
}
.remind {
  text-align: center;
}
.remind p {
  margin-top: 2px;
  font-size: 10px;
  color: #9b9d9a;
}
</style>