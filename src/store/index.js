import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

let state = {
  // 歌曲相关信息
  audio: {
    currentTime: 0,
  },
  // 歌词滚动记录点，避免做过多的for循环影响性能
  breakpoint: 0,
  // 是否在播放中
  isPlayed: false
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
