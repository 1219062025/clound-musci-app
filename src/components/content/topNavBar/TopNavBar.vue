<template>
  <div id="top-nav-bar">
    <nav-bar back-color="#edf7f9">
      <template #left>
        <slot name="left">
        </slot>
      </template>
      <template #center>
        <el-input
          class="input"
          v-model="input"
          :placeholder="defaultKey"
        >
          <template #suffix>
            <p
              class="icon"
              @click="search"
            ></p>
          </template>
        </el-input>
      </template>
      <template #right>
        <slot name="right">
        </slot>
      </template>
    </nav-bar>
  </div>
</template>

<script>
// 绝对公共组件
import NavBar from "components/common/navBar/NavBar";

// 网络请求
import { getDefaultKey } from "network/discover";
export default {
  name: "TopNavBar",
  data() {
    return {
      input: "",
      // 默认热搜关键词
      defaultKey: "",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    search() {
      const query = {
        queryString: "",
      };
      this.input
        ? (query.queryString = this.input)
        : (query.queryString = this.defaultKey);
      this.$router.push({
        path: "/search",
        query,
      });
    },
  },
  mounted() {
    getDefaultKey().then(
      (key) => (this.defaultKey = key.data.data.showKeyword)
    );
  },
};
</script>

<style scoped>
#top-nav-bar {
  position: relative;
  z-index: 1;
  display: flex;
  padding: 10px 0;
  background: #edf7f9;
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
