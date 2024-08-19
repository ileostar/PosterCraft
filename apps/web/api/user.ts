import { request } from "../utils/request";

export function getUserInfo(userId: string) {
  return request({
    url: `/users/${userId}`,
    method: "get",
  });
}

export function updateUserInfo(id:any,data: any) {
  return request({
    url: `/users/${id}`,
    data: data,
    method: "put",
  });
}

export function deleteUser(userId: string) {
  return request({
    url: `/users/${userId}`,
    method: "delete",
  });
}
