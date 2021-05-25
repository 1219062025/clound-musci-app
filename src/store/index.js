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
  isPlayed: false,
  // 播放列表
  playList: [],
  // 当前播放的歌曲在播放列表中的下标
  index: 0,
  // 播放模式，0：顺序循环，1：单曲循环，2：随机播放
  playMode: 0,
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
