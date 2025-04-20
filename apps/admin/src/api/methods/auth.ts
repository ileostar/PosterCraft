import http from '..'

export default {
  login: (dto: { identifier: string, password: string }) => {
    return http.post('/auth/admin/login', dto)
  },
}
