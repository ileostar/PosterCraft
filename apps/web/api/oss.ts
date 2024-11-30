import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { UploadFileResponse } from "./types/oss";

/** 发送短信 */
export function uploadFile(body: any, headers?: any) {
  return http.post<ResponseData<UploadFileResponse>>("/oss/upload", body, headers);
}
