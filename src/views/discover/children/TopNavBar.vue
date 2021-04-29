<template>
  <div id="top-nav-bar">
    <nav-bar back-color="#edf7f9">
      <template #left>
        <p class="icon"></p>
      </template>
      <template #center>
        <el-input
          class="input"
          v-model="input"
          :placeholder="defaultKey"
        >
          <template #suffix>
            <p class="icon"></p>
          </template>
        </el-input>
      </template>
      <template #right>
        <p class="icon"></p>
      </template>
    </nav-bar>
  </div>
</template>

<script>
// 绝对公共组件
import NavBar from "components/common/navBar/NavBar";

// 网络请求
import { getDefaultKey, getSearchData } from "network/discover";
export default {
  name: "TopNavBar",
  data() {
    return {
      input: "",
      // 默认热搜关键词
      defaultKey: "",
      // 轮播图数据
    };
  },
  components: {
    NavBar,
  },
  mounted() {
    getSearchData("周杰伦").then((val) => {});
    getDefaultKey().then(
      (key) => (this.defaultKey = key.data.data.showKeyword)
    );
  },
};
</script>

<style scoped>
#top-nav-bar {
  display: flex;
  padding: 10px 0;
}
.icon {
  font-size: 24px;
  color: #000;
}
.input >>> .el-input__suffix {
  right: 12px;
}
.input >>> .el-input__inner {
  caret-color: #000;
  border: none;
  border-radius: 22px;
  color: #000;
}
.input >>> .el-input__inner::-webkit-input-placeholder {
  color: #a5a5a5;
}
</style>
