import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  copyWorkResponse,
  createWorkBody,
  createWorkResponse,
  getWorkListBody,
  getWorkListResponse,
  getWorkResponse,
  publishWorkToTemplateResponse,
  updateWorkBody,
  updateWorkResponse,
} from "./types/work";

/** 创建工作区 */
export function createWork(body: createWorkBody) {
  return http.post<ResponseData<createWorkResponse>>(`/works`, body);
}

/** 获取工作区列表 */
export function getWorkList(query?: getWorkListBody) {
  return http.get<ResponseData<getWorkListResponse>>(`/works`, query);
}

/** 复制工作区 */
export function copyWork(workId: string) {
  return http.post<ResponseData<copyWorkResponse>>(`/works/copy/${workId}`);
}

/** 获取单个工作区 */
export function getWork(workId: string) {
  return http.get<ResponseData<getWorkResponse>>(`/works/${workId}`);
}

/** 更新单个工作区 */
export function updateWork(workId: string, body: updateWorkBody) {
  return http.put<ResponseData<updateWorkResponse>>(`/works/${workId}`, body);
}

/** 删除单个工作区 */
export function deleteWork(workId: string) {
  return http.delete<ResponseData<null>>(`/works/${workId}`);
}

/** 发布工作区模板 */
export function publishWorkToTemplate(workId: string) {
  return http.post<ResponseData<publishWorkToTemplateResponse>>(
    `/works/template/publish/${workId}`,
  );
}
