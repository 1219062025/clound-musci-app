import { PLAY } from "./mutations-types"
export default {
  [PLAY]
    (state, payload) {
    state.audio = {
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
      // 歌曲总时长
      duration: Math.round(payload.single.duration / 1000),
      // 歌词
      lyric: payload.lyric,
      currentTime: state.audio.currentTime
    }
  },

}