import { AxiosResponse } from "axios";
import { request } from "../utils/request";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
    code?: any;
    msg?: any;
  }

/**
 * sms发送短信
 */
export function sendBySMS(phone: any) {
    return request({
      url: "/sms/sendCode",
      data: {
        phone: phone,
      },
      method: "post",
    });
  }

/**
 * 手机号验证
 */
export function verifyPhone(phone: any,otp:any): Promise<CustomAxiosResponse>  {
    return request({
      url: "/sms/verify",
      data: {
        phone: phone,
        otp:otp
      },
      method: "post",
    });
  }

/**
 * 更换手机号
 */
export function updatePhone(phone: any,otp:any): Promise<CustomAxiosResponse> {
    return request({
      url: "/sms",
      data: {
        phone: phone,
        otp:otp
      },
      method: "put",
    });
  }