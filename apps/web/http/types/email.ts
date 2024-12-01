export type SendCodeByEmailBody = {
  email: string;
};

export type UpdateEmailBody = {
  email: string;
  otp: string;
};

export type BindEmailBody = UpdateEmailBody;

export type VerifyEmailBody = {
  email: string;
  otp: string;
};
