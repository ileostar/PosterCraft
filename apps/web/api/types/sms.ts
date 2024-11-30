export type SendBySmsBody = {
  phone: string;
};

export type VerifyPhoneBody = {
  phone: string;
  otp: string;
};

export type UpdatePhoneBody = VerifyPhoneBody;
