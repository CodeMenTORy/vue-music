import { request } from './axios';

export function getLyric(id) {
  return request({
    url: '/lrc',
    params: {
      id,
    },
  });
}
