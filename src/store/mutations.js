import { PLAY } from "./mutations-types"
export default {
  [PLAY]
    (state, payload) {
    // 音频URL
    state.audio.audioUrl = payload.url
    // 歌曲图片
    state.audio.pic = payload.single.pic
    // 歌曲名
    state.audio.name = payload.single.name
    // 歌手
    state.audio.artists = payload.single.artists
    // 歌曲额外描述
    state.audio.tns = payload.single.tns
    // 歌曲总时长
    state.audio.duration = Math.round(payload.single.dt / 1000)
  },

}