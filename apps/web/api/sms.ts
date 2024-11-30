import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { SendBySmsBody, UpdatePhoneBody, VerifyPhoneBody } from "./types/sms";

/** 发送短信 */
export function sendBySMS(body: SendBySmsBody) {
  return http.post<ResponseData<null>>("/sms/sendCode", body);
}

/** 手机号验证 */
export function verifyPhone(body: VerifyPhoneBody) {
  return http.post<ResponseData<null>>("/sms/verify", body);
}

/** 更换手机号 */
export function updatePhone(body: UpdatePhoneBody) {
  return http.put<ResponseData<null>>("/sms", body);
}
