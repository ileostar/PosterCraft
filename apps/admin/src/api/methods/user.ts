// 案例学习：https://alova.js.org/zh-CN/tutorial/best-practice/method-manage
import http from '..'

export default {
  getHello: () => {
    return http.get('')
  },
  findAll: (pageNum: number, pageCount: number) => {
    return http.get('/user/findAll', {
      pageNum,
      pageCount,
    })
  },
}
