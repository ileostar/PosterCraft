import http from '..'

export default {
  /** 获取用户信息 */
  getAllUsers: () => {
    return http.get(`/user/all`)
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
