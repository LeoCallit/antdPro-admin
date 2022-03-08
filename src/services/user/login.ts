// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type {LoginParams, LoginResult} from "@/pages/user/Login/index.type";

/*
*  获取用户管理列表
* */
export async function login(data: LoginParams, options?: { [key: string]: any }): Promise<LoginResult> {
  return request<LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
