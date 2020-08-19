import axios from 'axios';

export function request(config) {
  const instance = new axios.create({
    baseURL: 'https://api.itooi.cn/tencent',
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      //拦截后需要将拦截下来的请求数据返回发送
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      // 拦截后需要将拦截下来处理成的结果返回,此处只返回响应的数据部分
      return res.data;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

  return instance(config);
}
