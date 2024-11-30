import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  GetTemplateListBody,
  GetTemplateListResponse,
  GetTemplateResponse,
} from "./types/template";

/** 获取模板列表 */
export function getTemplateList(query?: GetTemplateListBody) {
  return http.get<ResponseData<GetTemplateListResponse>>(`/templates`, query);
}

/** 获取单个模板 */
export function getTemplate(workId: string) {
  return http.get<ResponseData<GetTemplateResponse>>(`/templates/${workId}`);
}
