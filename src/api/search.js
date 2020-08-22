import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';
import { request } from './axios';

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
  });

  return jsonp(url, data, options);
}

export function search(query, page, zhida, pagesize = 30) {
  return request({
    url: '/search',
    params: {
      keyword: query,
      type: zhida ? 'singer' : 'song',
      pageSize: pagesize,
      page: page,
    },
  });
}
