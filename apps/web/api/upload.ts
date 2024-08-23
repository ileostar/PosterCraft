import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { uploadFileBody,uploadFileResponse } from "./types/upload";

/** 发送短信 */
export function uploadFile(body: any, headers?: any) {
    return http.post<ResponseData<uploadFileResponse>>("/oss/upload", body,  headers );
  }