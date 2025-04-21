import http from '..'

export default {
  /** 获取用户信息 */
  getAllUsers: (params?: {
    page?: number
    pageSize?: number
    username?: string
    role?: string
    phone?: string
  }) => {
    return http.get(`/user/all`, params).send(true)
  },

  /** 创建用户 */
  createUser: (body: any) => {
    return http.post(`/user`, body)
  },

  /** 更新用户信息 */
  updateUserInfo: (userId: string, body: any) => {
    return http.put(`/user/${userId}`, body)
  },

  /** 删除用户信息 */
  deleteUser: (userId: string) => {
    return http.delete(`/user/${userId}`)
  },
}
