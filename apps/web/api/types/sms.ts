export type sendBySMSBody = {
  phone:string;
};

export type verifyPhoneBody = {
  phone:string;
  otp:string;
};

export type updatePhoneBody  = verifyPhoneBody

 