import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { useGoToLoginStore } from "@/stores/loginDialog";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      const curToken = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${curToken}`;
    }
    return config;
  },
  function (error: unknown) {
    console.log(error, "error");
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 打印响应数据
    console.log("响应数据:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  function (error: unknown) {
    const { setIsOpen } = useGoToLoginStore();
    // 打印完整的错误对象，包含response信息
    console.log("完整错误信息:", {
      status: (error as any).response?.status,
      statusText: (error as any).response?.statusText,
      data: (error as any).response?.data,
      error,
    });
    if ((error as any).response?.data?.message === "Unauthorized") {
      console.log("token过期");
      setIsOpen(true);
    }
    return Promise.reject(error);
  },
);

interface Data {
  [index: string]: unknown;
}

interface Http {
  get: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    data?: Data | Array<string>,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config,
    });
  },
  post(url, data, config) {
    return instance.post(url, data, config);
  },
  put(url, data, config) {
    return instance.put(url, data, config);
  },
  patch(url: string, data: any, config) {
    return instance.patch(url, data, config);
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config,
    });
  },
};

export default http;
