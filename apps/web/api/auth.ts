import { openCenteredOAuthPopup } from "@/utils/popup";
import { AxiosResponse } from "axios";
import io from "socket.io-client";
import { request } from "../utils/request";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  token?: any;
  code?: any;
  msg?: any;
}

interface GithubSignInResponse {
  token?: any;
  code?: any;
  msg?: any;
  data: {
    isSignUp: any;
    userData: {
        username: any;
    };
};
}


/**
 * sms短信登录
 */
export async function loginBySMS(phone: any, code: any): Promise<CustomAxiosResponse> {
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
 * 普通注册
 */
export function defaultSignUp(username: any, password: any, phone: any, otp: any) {
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
export function defaultSignIn(identifier: any, password: any): Promise<CustomAxiosResponse> {
  return request({
    url: "/auth/login",
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

 
// export function githubSignIn() {
//   const socket = io("http://localhost:3001"); // 连接到你的NestJS WebSocket服务器

//   const authWindow = openCenteredOAuthPopup("http://127.0.0.1:3001/auth/github/callback", 600, 500);
//   socket.on("connect", () => {
//     console.log("Connected to the server!");
//   });
//   socket.on("messageToAll", (data: any) => {
//     console.log("Received message from server:", JSON.parse(data));
//     authWindow!.close();
//     socket.close();
//   });
// }

/**
 * github登录
 */
export async function githubSignIn(): Promise<GithubSignInResponse> {
  const socket = io("http://localhost:3001");

  const authWindow = openCenteredOAuthPopup("http://127.0.0.1:3001/auth/github/callback", 600, 500);

  socket.on("connect", () => {
    console.log("Connected to the server!");
  });

  return new Promise((resolve, reject) => {
    socket.on("messageToAll", (data: string) => { 
      try {
        const parsedData = JSON.parse(data);
        console.log("Received message from server:", parsedData);
        authWindow!.close();
        socket.close();
        resolve(parsedData); 
      } catch (error) {
        console.error("Error parsing message:", error);
        reject(new Error('Something went wrong'));
      }
    });
  });
}

 