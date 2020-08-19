import { request } from './axios';

export function getRecommend() {
  return request({
    url: '/banner',
  });
}

export function getDiscList() {
  return request({
    url: '/songList/hot',
  });
}
