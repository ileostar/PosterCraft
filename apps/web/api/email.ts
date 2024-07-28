import { request } from "../utils/request";
import { AxiosResponse } from "axios";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
    token?: any;
    code?: any;
    msg?: any;
  }

export function sendCodeByEmail(email: string): Promise<CustomAxiosResponse>  {
  return request({
    url: "/mail/sendCodeByEmail",
    params: {
      email: email,
    },
    method: "get",
  });
}

export function updateEmail(userId: number,email: string,otp:string): Promise<CustomAxiosResponse>  {
  return request({
    url: "/mail/updateEmail",
    data: {
        email,
        userId,
        otp
    },
    method: "put",
  });
}

export function bindEmail(userId: number,email: string,otp:string): Promise<CustomAxiosResponse>  {
  return request({
    url: "/mail/bindEmail",
    data: {
        email,
        userId,
        otp
    },
    method: "post",
  });
}
