import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  BindEmailBody,
  SendCodeByEmailBody,
  UpdateEmailBody,
  VerifyEmailBody,
} from "./types/email";

/** 发送邮箱验证码 */
export function sendCodeByEmail(body: SendCodeByEmailBody) {
  return http.post<ResponseData<null>>("/mail/sendCode", body);
}

/** 更换邮箱 */
export function updateEmail(body: UpdateEmailBody) {
  return http.put<ResponseData<null>>("/mail", body);
}

/** 绑定邮箱 */
export function bindEmail(body: BindEmailBody) {
  return http.post<ResponseData<null>>("/mail/bind", body);
}

/** 验证邮箱 */
export function verifyEmail(body: VerifyEmailBody) {
  return http.post<ResponseData<null>>("/mail/verify", body);
}
