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