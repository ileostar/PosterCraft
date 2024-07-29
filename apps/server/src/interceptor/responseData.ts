export type CustomResponseType = {
  message?: string;
  data?: Object;
  token?: string;
  [index: string]: unknown;
};

export class ResponseData<T> {
  code: number; //状态码
  msg: string; //消息
  data?: T; //数据内容
  token?: string; // token

  constructor(code = 200, msg: string, data: T = null, token?: string) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.token = token;
  }

  static ok<T>(data: T = null, message = 'ok', token?): ResponseData<T> {
    if (token) return new ResponseData(200, message, data, token);
    else return new ResponseData(200, message, data);
  }

  static fail(message = 'fail', code = -1): ResponseData<null> {
    return new ResponseData(code, message);
  }
}
