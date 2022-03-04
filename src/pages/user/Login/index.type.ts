import type {Userinfo} from "@/pages/index.type";

export type LoginType = "mobile" | "account";

export interface LoginParams {
  username: string;
  password: string;
  autoLogin: boolean;
  type: LoginType;
}

export type LoginResult = API.Response<{
  token: string;
  userinfo: Userinfo
}>;
