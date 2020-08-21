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

export function getSongList(dissid) {
  return request({
    url: '/songList',
    params: {
      id: dissid,
    },
  });
}
