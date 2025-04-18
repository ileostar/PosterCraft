// 案例学习：https://alova.js.org/zh-CN/tutorial/best-practice/manage-apis
import type { AlovaMethodCreateConfig, Method } from 'alova'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'

// create alova instance
export const instance = createAlova({
  baseURL: import.meta.env.VITE_ALOVA_BASE_URI,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 50000,
  beforeRequest(method) { // 这里设置请求拦截器
    // 请求头中添加Authorization认证信息
    method.config.headers.Authorization = localStorage.getItem('Authorization') ?? ''
  },
  responded: { // 这里设置响应拦截器
    onSuccess: async (response: { status: number, statusText: string | undefined, json: () => any }, _method: any) => {
      if (response.status >= 400)
        throw new Error(response.statusText)

      const json = await response.json()
      if (response.status !== 200)
        throw new Error(json.message)

      if (json.code !== 200)
        throw new Error(json.message)

      return json.data
    },
    onError: (err, _method) => {
      // eslint-disable-next-line no-console
      console.log('响应error:', err.message)
    },
  },
})

/**
 * 封装Alova
 * 统一传参
 */
interface Data {
  [index: string]: unknown
}
type Config = AlovaMethodCreateConfig<unknown, unknown, RequestInit, Headers> | undefined

interface Http {
  get: (
    url: string,
    data?: Data,
    config?: Config
  ) => Method
  post: (
    url: string,
    data?: Data | Array<string>,
    config?: Config,
  ) => Method
  put: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
  patch: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
  delete: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
}

const http: Http = {
  get(url: string, data?: any, config = {}) {
    return instance.Get(url, {
      params: data,
      ...config,
    })
  },
  post(url: any, data: any, config = {}) {
    return instance.Post(url, data, config)
  },
  put(url: any, data: any, config = {}) {
    return instance.Put(url, data, config)
  },
  patch(url: any, data: any, config = {}) {
    return instance.Patch(url, data, config)
  },
  delete(url: any, data: any, config = {}) {
    return instance.Delete(url, {
      data,
      ...config,
    })
  },
}

export default http
