import { request } from './request'
// 获取发现页面的所有数据
export function getDiscover() {
  return request({
    url: '/homepage/block/page'
  })
}
export function getSearchData(keywords) {
  // keywords: 关键字
  return request({
    url: '/search/suggest',
    params: {
      keywords
    },
  })
}
// 获取搜索栏建议搜索关键字
export function getDefaultKey() {
  return request({
    url: '/search/default',
  })
}
// 获取轮播图数据
export function getBanner(type) {
  // type：0 - PC端，1 - android， 2 - iphone，3 - ipad
  return request({
    url: '/banner',
    params: {
      type
    },
  })
}
// 获取发现页面圆形按钮列表数据
export function getBall() {
  return request({
    url: '/homepage/dragon/ball',
  })
}
// 获取推荐歌单模块数据
export function getPersonalized(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    },
    method: 'post'
  })
}