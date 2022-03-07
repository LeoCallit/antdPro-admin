// @ts-ignore
/* eslint-disable */

interface User{
  id: number;
  username: string;
  password: string;
  phone?: string;
  email?: string;
  avatar: string;
  desc?: string;
  status: number;
  roles: number[];
}

declare namespace API {
  // 接口的返回值类型
  export type Userinfo = User;

  export interface Response<T=any> {
    code: number; // 状态
    data?: T; // 返回的数据
    message?: string; // 返回的消息
  }
}
