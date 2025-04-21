import http from '../index'

// 创建工作区
export function createWork(data: any) {
  return http.post('/work', data)
}

// 复制工作区
export function copyWork(workId: string) {
  return http.post(`/work/copy/${workId}`)
}

// 获取工作区列表
export function getWorksList(params: any) {
  return http.get('/work/list', { params })
}

// 获取单个工作区
export function getWorkInfo(workId: string) {
  return http.get(`/work/${workId}`)
}

// 获取用户工作区列表
export function getUserWorksList(params: any) {
  return http.get('/work/user/list', { params })
}

// 更新工作区
export function updateWork(workId: string, data: any) {
  return http.put(`/work/${workId}`, data)
}

// 删除工作区
export function deleteWork(workId: string) {
  return http.delete(`/work/${workId}`)
}

// 发布工作区
export function publishWork(workId: string) {
  return http.post(`/work/publish/${workId}`)
}

// 发布为工作区模版
export function publishWorkTemplate(workId: string) {
  return http.post(`/work/template/publish/${workId}`)
}

// 获取预览工作区地址
export function previewWork(workId: string) {
  return http.post(`/work/preview/${workId}`)
}

export default {
  createWork,
  copyWork,
  getWorksList,
  getWorkInfo,
  getUserWorksList,
  updateWork,
  deleteWork,
  publishWork,
  publishWorkTemplate,
  previewWork,
}
