import { GlobalEnvConfig } from "@/config";
import http from "@/utils/http";
import { openCenteredOAuthPopup } from "@/utils/others/popup";
import io from "socket.io-client";

import {
  defaultSignInBody,
  defaultSignInResponse,
  defaultSignUpBody,
  GithubSignInResponse,
  loginBySMSBody,
  loginBySMSResponse,
} from "./types/auth";
import { ResponseData } from "./types/common";

/** 普通登录 */
export function defaultSignIn(body: defaultSignInBody) {
  return http.post<ResponseData<defaultSignInResponse>>("/auth/login", body);
}

/** 短信登录 */
export function loginBySMS(body: loginBySMSBody) {
  return http.post<ResponseData<loginBySMSResponse>>("/auth/phoneOtpLogin", body);
}

/** 普通注册 */
export function defaultSignUp(body: defaultSignUpBody) {
  return http.post<ResponseData<null>>("/auth/signup", body);
}

/** github登录 */
export async function githubSignIn(): Promise<GithubSignInResponse> {
  const socket = io(GlobalEnvConfig.SERVER_URL);

  const authWindow = openCenteredOAuthPopup(
    `${GlobalEnvConfig.SERVER_URL}/auth/github/callback`,
    600,
    500,
  );

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
        reject(new Error("Something went wrong"));
      }
    });
  });
}
