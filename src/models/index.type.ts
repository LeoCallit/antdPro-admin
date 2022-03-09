import type { Action as RAction } from "redux";
import type {Menu} from "@/pages/System/MenuAdmin/index.type";

export interface Action<T = any> extends RAction {
  payload?: T;
}

export interface RootModelState {
  sysModel: SysModelType
  userModel: UserModelType;
}

export interface SysModelType {
  menus: Menu[];
}

export interface UserModelType {
  // userinfo: API.Userinfo;
}
