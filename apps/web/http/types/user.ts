export type GetUserInfoResponse = {
  avatar: string | null;
  nickname: string | null;
  username: string | null;
  email: string | null;
  phone: string;
  role: string;
};

export type UpdateUserInfoBody = {
  avatar?: string | undefined;
  nickname?: string | undefined;
  username?: string | undefined;
};

export type UpdateUserInfoResponse = UpdateUserInfoBody & { userId: string };

export type AddPasswordBody = {
  password: string;
};

export type UpdatePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
