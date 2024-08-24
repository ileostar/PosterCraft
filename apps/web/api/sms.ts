import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { sendBySMSBody, updatePhoneBody, verifyPhoneBody } from "./types/sms";

/** 发送短信 */
export function sendBySMS(body: sendBySMSBody) {
  return http.post<ResponseData<null>>("/sms/sendCode", body);
}

/** 手机号验证 */
export function verifyPhone(body: verifyPhoneBody) {
  return http.post<ResponseData<null>>("/sms/verify", body);
}

/** 更换手机号 */
export function updatePhone(body: updatePhoneBody) {
  return http.put<ResponseData<null>>("/sms", body);
}
