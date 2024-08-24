import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  bindEmailBody,
  sendCodeByEmailBody,
  updateEmailBody,
  verifyEmailBody,
} from "./types/email";

/** 发送邮箱验证码 */
export function sendCodeByEmail(body: sendCodeByEmailBody) {
  return http.post<ResponseData<null>>("/mail/sendCode", body);
}

/** 更换邮箱 */
export function updateEmail(body: updateEmailBody) {
  return http.put<ResponseData<null>>("/mail", body);
}

/** 绑定邮箱 */
export function bindEmail(body: bindEmailBody) {
  return http.post<ResponseData<null>>("/mail/bind", body);
}

/** 验证邮箱 */
export function verifyEmail(body: verifyEmailBody) {
  return http.post<ResponseData<null>>("/mail/verify", body);
}
