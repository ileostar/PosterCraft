import { AxiosResponse } from "axios";

export interface ResponseData<T>{
  code: number;
  msg: string;
  data: T;
  token?: string;
}
