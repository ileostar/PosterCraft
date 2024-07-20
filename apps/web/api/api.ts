import { openCenteredOAuthPopup } from "@/utils/popup";
import axios, { AxiosResponse } from "axios";
import io from "socket.io-client";

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
export function googleSignIn() {
  const socket = io("http://localhost:3001"); // 连接到你的NestJS WebSocket服务器

  const authWindow = openCenteredOAuthPopup("http://127.0.0.1:3001/auth/google/callback", 600, 500);
  socket.on("connect", () => {
    console.log("Connected to the server!");
  });
  socket.on("messageToAll", (data: any) => {
    console.log("Received message from server:", JSON.parse(data));
    authWindow!.close();
    socket.close();
  });
}

/**
 * github登录
 */
export function githubSignIn() {
  const socket = io("http://localhost:3001"); // 连接到你的NestJS WebSocket服务器

  const authWindow = openCenteredOAuthPopup("http://127.0.0.1:3001/auth/github/callback", 600, 500);
  socket.on("connect", () => {
    console.log("Connected to the server!");
  });
  socket.on("messageToAll", (data: any) => {
    console.log("Received message from server:", JSON.parse(data));
    authWindow!.close();
    socket.close();
  });
}
