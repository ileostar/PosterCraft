import { request } from "./request";

export function getUserInfo(userId: number) {
  return request({
    url: "/user/getUserInfosByUserId",
    params: {
      userId: userId,
    },
    method: "get",
  });
}

export function updateUserInfo(data: any) {
  return request({
    url: "/user/updateUserInfos",
    data:data,
    method: "post",
  });
}

export function deleteUser() {
  return request({
    url: "/user/deleteUserById",
    method: "delete",
  });
}
