import { AxiosResponse } from "axios";

import { request } from "../utils/request";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  token?: any;
  code?: any;
  msg?: any;
}

//发送邮箱验证码
export function sendCodeByEmail(email: string): Promise<CustomAxiosResponse> {
  return request({
    url: "/mail/sendCode",
    params: {
      email: email,
    },
    method: "get",
  });
}

//更换邮箱
export function updateEmail(
  userId: string,
  email: string,
  otp: string,
): Promise<CustomAxiosResponse> {
  return request({
    url: "/mail",
    data: {
      email,
      userId,
      otp,
    },
    method: "put",
  });
}

//绑定邮箱
export function bindEmail(
  userId: string,
  email: string,
  otp: string,
): Promise<CustomAxiosResponse> {
  return request({
    url: "/mail/bind",
    data: {
      email,
      userId,
      otp,
    },
    method: "post",
  });
}

//验证邮箱
export function verifyEmail(
  email: string,
  otp: string,
): Promise<CustomAxiosResponse> {
  return request({
    url: "/mail/verify",
    data: {
      email,
      otp
    },
    method: "post",
  });
}
