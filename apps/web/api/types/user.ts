export type getUserInfoResponse = {
  avatar: string | null;
  nickname: string | null;
  username: string | null;
  email: string | null;
  phone: string;
  role: string;
};

export type updateUserInfoBody = {
  avatar?: string | undefined;
  nickname?: string | undefined;
  username?: string | undefined;
};

export type updateUserInfoResponse = updateUserInfoBody & { userId: string };
