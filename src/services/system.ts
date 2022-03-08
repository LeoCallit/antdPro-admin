import { request } from "umi";

export function getUsersList(params: any): Promise<API.Response> {
  return request<API.Response>("/api/users/list", {
    method: "get",
    params,
  });
}
