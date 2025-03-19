export interface ResponseData<T> {
  id: any;
  code: number;
  msg: string;
  data: T;
  token?: string;
}
