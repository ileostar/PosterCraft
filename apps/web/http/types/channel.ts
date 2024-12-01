export type UpdateChannelBody = {
  name: string;
  description: string;
};

export type CreateChannelResponse = {
  name: string;
  channelId: string;
};

export type GetChannelResponse = {
  count: number;
  list: CreateChannelResponse[];
};
