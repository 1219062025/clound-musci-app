import { request } from './request'

export function getSearchData(keywords, offset) {
  // keywords: 关键字
  return request({
    url: '/cloudsearch',
    params: {
      keywords,
      offset
    },
  })
}
export function getSingle(id) {
  // id: 歌曲的id
  return request({
    url: '/song/url',
    params: {
      id
    },
  })
}
export function getLyric(id) {
  // id: 歌曲的id
  return request({
    url: '/lyric',
    params: {
      id
    },
  })
}