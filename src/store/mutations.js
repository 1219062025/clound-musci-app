import { PLAY } from "./mutations-types"
export default {
  [PLAY]
    (state, payload) {
    state.audio = {
      // 音频id
      id: payload.id,
      // 音频URL
      audioUrl: payload.url,
      // 歌曲图片
      pic: payload.single.pic,
      // 歌曲名
      name: payload.single.name,
      // 歌手
      artists: payload.single.artists,
      // 歌曲额外描述
      tns: payload.single.tns,
      // 额外描述
      alia: payload.single.alia,
      // 歌曲是否未登录、非会员的用户只能试听
      freeTrialInfo: payload.freeTrialInfo,
      // 歌曲总时长
      duration: Math.round(payload.single.duration / 1000),
      // 歌词
      lyric: payload.lyric,
      currentTime: state.audio.currentTime
    }
    for (let i = 0; i < state.playList.length; i++) {
      if (state.audio.id === state.playList[i].id) state.playList.splice(i, 1)
    }
    state.playList.unshift(state.audio)
  },

}