export type sendCodeByEmailBody = {
  email: string;
};

export type updateEmailBody = {
  userId: string;
  email: string;
  otp: string;
};

export type bindEmailBody = updateEmailBody;

export type verifyEmailBody = {
  email: string;
  otp: string;
};
