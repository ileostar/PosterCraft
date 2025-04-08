import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  CopyWorkResponse,
  CreateWorkBody,
  CreateWorkResponse,
  GetWorkListBody,
  GetWorkListResponse,
  GetWorkResponse,
  UpdateWorkResponse,
  WorkPreviewResponse,
} from "./types/work";

/** 创建工作区 */
export function createWork(body: CreateWorkBody) {
  return http.post<ResponseData<CreateWorkResponse>>(`/work`, body);
}

/** 获取工作区列表 */
export function getWorkList(query?: GetWorkListBody) {
  return http.get<ResponseData<GetWorkListResponse>>(`/work/list`, query);
}

/** 复制工作区 */
export function copyWork(workId: string) {
  return http.post<ResponseData<CopyWorkResponse>>(`/work/copy/${workId}`);
}

/** 获取单个工作区 */
export function getWork(workId: string) {
  return http.get<ResponseData<GetWorkResponse>>(`/work/${workId}`);
}

/** 更新单个工作区 */
export function updateWork(workId: string, body: UpdateWorkResponse) {
  return http.put<ResponseData<UpdateWorkResponse>>(`/work/${workId}`, body);
}

/** 删除单个工作区 */
export function deleteWork(workId: string) {
  return http.delete<ResponseData<null>>(`/work/${workId}`);
}

/** 发布工作区 */
export function publishWork(workId: string) {
  return http.post<ResponseData<WorkPreviewResponse>>(`/work/publish/${workId}`);
}

/** 发布工作区模板 */
export function publishWorkToTemplate(workId: string) {
  return http.post<ResponseData<WorkPreviewResponse>>(`/work/template/publish/${workId}`);
}

/** 获取工作区预览链接 */
export function getPreviewUrl(workId: string) {
  return http.get<ResponseData<WorkPreviewResponse>>(`/work/preview/${workId}`);
}
