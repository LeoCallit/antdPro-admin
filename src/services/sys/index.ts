import { request } from "umi";
import type {UserParams} from "@/services/sys/index.type";
import type {RoleParams} from "@/pages/System/RoleAdmin/index.type";

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

/*
*  角色列表
* */
export function getRoleList(params: API.BasePageParams & RoleParams): Promise<API.Response> {
  return request<API.Response>("/api/role/list", {
    method: "get",
    params,
  });
}

/*
*  添加角色
* */
export function createRole(data: RoleParams): Promise<API.Response> {
  return request<API.Response>("/api/role/createRole", {
    method: "POST",
    data,
  });
}

/*
*  删除角色
* */
export function delRole(data: API.BaseEditParams): Promise<API.Response> {
  return request<API.Response>("/api/role/delRole", {
    method: "POST",
    data,
  });
}

/*
*  修改角色
* */
export function editRole(data: API.BasePageParams & RoleParams): Promise<API.Response> {
  return request<API.Response>("/api/role/editRole", {
    method: "POST",
    data,
  });
}

/*
*  菜单列表
* */
export function getMenuList(params?: API.BasePageParams): Promise<API.Response> {
  return request<API.Response>("/api/menu/list", {
    method: "get",
    params,
  });
}
