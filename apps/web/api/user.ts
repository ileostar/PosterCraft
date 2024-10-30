import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { getUserInfoResponse, updateUserInfoBody, updateUserInfoResponse } from "./types/user";

/** 获取用户信息 */
export function getUserInfo(userId: string) {
  return http.get<ResponseData<getUserInfoResponse>>(`/user/${userId}`);
}

/** 更新用户信息 */
export function updateUserInfo(userId: string, body: updateUserInfoBody) {
  return http.put<ResponseData<updateUserInfoResponse>>(`/user/${userId}`, body);
}

/** 删除用户信息 */
export function deleteUser(userId: string) {
  return http.delete<ResponseData<null>>(`/user/${userId}`);
}
