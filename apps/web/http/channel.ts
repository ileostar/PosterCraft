import http from "@/utils/http";

import { CreateChannelResponse, GetChannelResponse, UpdateChannelBody } from "./types/channel";
import { ResponseData } from "./types/common";

export function createChannel(workId: string) {
  return http.post<ResponseData<CreateChannelResponse>>(`/api/channels/${workId}`);
}

export function getChannel(channelId: string) {
  return http.get<ResponseData<GetChannelResponse>>(`/api/channels/${channelId}`);
}

export function updateChannel(channelId: string, body: UpdateChannelBody) {
  return http.put<ResponseData<null>>(`/api/channels/${channelId}`, body);
}

export function deleteChannel(channelId: string) {
  return http.delete<ResponseData<null>>(`/api/channels/${channelId}`);
}
