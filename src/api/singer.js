import { request } from './axios';

export function getIndexCategory() {
  return request({
    url: '/artist/category',
  });
}

export function getSingerList(index, areaId = 200, pageSize = 10) {
  return request({
    url: '/artist/list',
    params: {
      // 只显示内陆
      areaId,
      index,
      pageSize,
    },
  });
}
