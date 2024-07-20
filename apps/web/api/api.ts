import { url } from "inspector";

import { openCenteredOAuthPopup } from "@/utils/popup";
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
export function githubSignIn(): any {
  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event: { origin: any }) {
    // For Chrome, the origin property is in the event.originalEvent
    // object.
    // 这里不准确，chrome 没有这个属性
    // var origin = event.origin || event.originalEvent.origin;
    var origin = event.origin;
    // if (origin !== "http://example.org:8080") return;

    // ...
    console.log(event);
    window.close();
  }
  openCenteredOAuthPopup("http://127.0.0.1:3001/auth/github/callback", 600, 500);
  // return request({
  //   url: '/auth/github/callback',
  //   method: 'get',
  // })
  // return axios.get("");
}
