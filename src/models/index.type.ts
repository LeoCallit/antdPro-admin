import type { Action as RAction } from "redux";

export interface Action<T = any> extends RAction {
  payload?: T;
}

export interface RootModelState {
  userModel: UserModelType;
}

export interface UserModelType {
  // userinfo: API.Userinfo;
}
