import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  getTemplateListBody,
  getTemplateListResponse,
  getTemplateResponse,
} from "./types/template";

/** 获取模板列表 */
export function getTemplateList(query?: getTemplateListBody) {
  return http.get<ResponseData<getTemplateListResponse>>(`/templates`, query);
}

/** 获取单个模板 */
export function getTemplate(workId: string) {
  return http.get<ResponseData<getTemplateResponse>>(`/templates/${workId}`);
}
