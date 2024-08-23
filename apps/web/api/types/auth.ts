import { ResponseData } from "./common";

export type defaultSignInBody = {
  identifier: string;
  password: string;
};

export type defaultSignInResponse = {
  userId: string;
  userName: string;
  phone: string;
  role: string;
  email: string | null;
};

export type loginBySMSBody = {
  phone: string;
  otp: string;
};

export type loginBySMSResponse = defaultSignInResponse;

export type defaultSignUpBody = {
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
