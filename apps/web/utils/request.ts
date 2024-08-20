import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3001",
    // baseURL: '/api',
    timeout: 5000,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      // 'content-type': 'application/json'
    },
  });

  let token: string | null;
  token = window.localStorage.getItem("token") && `Bearer ${window.localStorage.getItem("token")}`;

  //请求拦截的作用
  instance.interceptors.request.use(
    (config) => {
      NProgress.start();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  //响应拦截
  instance.interceptors.response.use(
    (res) => {
      NProgress.done();
      return res.data;
    },
    (err) => {
      NProgress.done();
      console.log(err);
    },
  );

  return instance(config);
}
