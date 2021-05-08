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
export function getSingleUrl(id) {
  // id: 单曲id
  return request({
    url: '/song/url',
    params: {
      id
    },
  })
}