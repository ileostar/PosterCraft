import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { GetUserInfoResponse, UpdateUserInfoBody, UpdateUserInfoResponse } from "./types/user";

/** 获取用户信息 */
export function getUserInfo(userId: string) {
  return http.get<ResponseData<GetUserInfoResponse>>(`/user/${userId}`);
}

/** 更新用户信息 */
export function updateUserInfo(userId: string, body: UpdateUserInfoBody) {
  return http.put<ResponseData<UpdateUserInfoResponse>>(`/user/${userId}`, body);
}

/** 删除用户信息 */
export function deleteUser(userId: string) {
  return http.delete<ResponseData<null>>(`/user/${userId}`);
}
