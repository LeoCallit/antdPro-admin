import type { Action as RAction } from "redux";
import type {Userinfo} from "@/pages/index.type";

export interface Action<T = any> extends RAction {
  payload?: T;
}

export interface RootModelState {
  userModel: UserModelType;
}

export interface UserModelType {
  userinfo: Userinfo;
}
