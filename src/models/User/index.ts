import type {Model} from "dva";
import type {Action, UserModelType} from "@/models/index.type";
import type {Userinfo} from "@/pages/index.type";

import {getStorage} from "@/pages/common/js/store";
import {USERINFO_KEY} from "@/pages/common/js/constants";

const defaultState: UserModelType = {
  userinfo: getStorage(USERINFO_KEY, {}) as Userinfo,
};

const UserModel: Model = {
  namespace: "userModel",
  state: defaultState,
  reducers: {
    setUserinfo(state: UserModelType, action: Action<Userinfo>) {
      const {payload} = action;
      if (!payload) {
        return state;
      }
      return {
        ...state,
        userinfo: payload,
      };
    }
  },
  effects: {},
};

export default UserModel;
