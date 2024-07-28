import { request } from "../utils/request";

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
    method: "put",
  });
}

export function deleteUser(userId: number) {
  return request({
    url: "/user/deleteUserById",
    data: {
      userId: userId,
    },
    method: "delete",
  });
}
