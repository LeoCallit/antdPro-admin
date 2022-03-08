import { request } from "umi";
import type {UserParams} from "@/services/sys/index.type";

/*
*  获取用户管理列表
* */
export function getUsersList(params: API.BasePageParams & UserParams): Promise<API.Response> {
  return request<API.Response>("/api/users/list", {
    method: "get",
    params,
  });
}

/*
*  创建用户
* */
export function createUser(data: UserParams): Promise<API.Response> {
  return request<API.Response>("/api/users/create", {
    method: "post",
    data
  });
}

/*
*  删除用户
* */
export function delUser(data: API.BaseEditParams): Promise<API.Response> {
  return request<API.Response>("/api/users/delUser", {
    method: "post",
    data
  });
}

/*
*  编辑用户
* */
export function editUser(data: UserParams & API.BaseEditParams): Promise<API.Response> {
  return request<API.Response>("/api/users/editUser", {
    method: "post",
    data
  });
}
