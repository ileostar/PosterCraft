import { ResponseData } from "./common";

export type DefaultSignInBody = {
  identifier: string;
  password: string;
};

export type DefaultSignInResponse = {
  userId: string;
  userName: string;
  phone: string;
  role: string;
  email: string | null;
};

export type LoginBySmsBody = {
  phone: string;
  otp: string;
};

export type LoginBySmsResponse = DefaultSignInResponse;

export type DefaultSignUpBody = {
  username: string;
  password: string | null;
  phone: string;
  otp: string;
};

export interface GithubSignInResponse
  extends ResponseData<{
    isSignUp: boolean;
    userData: {
      username: string;
      [index: string]: unknown;
    };
  }> {}
