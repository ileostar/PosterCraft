import { request } from "./request";

export function getUserInfo() {
  return request({
    url: "/user/getUserInfosByUserId",
    method: "get"
  });
}

export function updateUserInfo() {
  return request({
    url: "/user/updateUserInfos",
    method: "post"
  });
}

export function deleteUser() {
    return request({
      url: "/user/deleteUserById",
      method: "delete"
    });
  }
  