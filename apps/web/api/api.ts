import { url } from "inspector";

import axios, { AxiosResponse } from "axios";

import { request } from "./request";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  token?: any;
  code?: any;
  msg?: any;
}

/**
 * sms短信登录
 */
export async function loginBySMS(phone: string, code: string): Promise<CustomAxiosResponse> {
  return request({
    url: "/auth/phoneOtpLogin",
    data: {
      phone: phone,
      otp: code,
    },
    method: "post",
  });
}

/**
 * sms发送短信
 */
export function sendBySMS(phone: any) {
  return request({
    url: "/sms/sendCodeBySMS",
    data: {
      phone: phone,
    },
    method: "post",
  });
}

/**
 * 普通注册
 */
export function defaultSignUp(username: string, password: string, phone: string, otp: string) {
  return request({
    url: "/auth/signup",
    data: {
      username,
      password,
      phone,
      otp,
    },
    method: "post",
  });
}

/**
 * 普通登录
 */
export function defaultSignIn(identifier: string, password: string): Promise<CustomAxiosResponse> {
  return request({
    url: "/auth/defaultLogin",
    data: {
      identifier,
      password,
    },
    method: "post",
  });
}

/**
 * 谷歌登录
 */
export function googleSignIn(): Promise<CustomAxiosResponse> {
  return request({
    url: "/auth/google/callback",
    method: "get",
  });
}

/**
 * github登录
 */
export function githubSignIn(): Promise<CustomAxiosResponse> {
  // return request({
  //   url: '/auth/github/callback',
  //   method: 'get',
  // })
  return axios.get("");
}
