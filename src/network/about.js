import { request } from './request'
export function getData() {
  return request({
    url: '/playlist/hot',
    method: 'post'
  })
}