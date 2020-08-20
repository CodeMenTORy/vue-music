import { request } from './axios';

export function getSingerDetail(id) {
  return request({
    url: '/song/artist',
    params: {
      id,
    },
  });
}
