import { request } from './axios';

export function getIndexCategory() {
  return request({
    url: '/artist/category',
  });
}

export function getSingerList(index) {
  return request({
    url: '/artist/list',
    params: {
      index,
      // 只显示内陆
      areaID: 200,
    },
  });
}
