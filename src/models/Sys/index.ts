import type {Model} from "dva";
import type {Action, RootModelState, SysModelType} from "@/models/index.type";
import type {Menu} from "@/pages/System/MenuAdmin/index.type";

import {setStorage, getStorage} from "@/common/js/store";
import {getMenuList} from "@/services/sys";
import {ERR_OK, MENU_KEY} from "@/common/js/constants";
import {message} from "antd";

const defaultState: SysModelType = {
  menus: getStorage(MENU_KEY, [])
};

const UserModel: Model = {
  namespace: "sysModel",
  state: defaultState,
  reducers: {
    setMenus(state: SysModelType, action: Action<Menu[]>) {
      return {
        ...state,
        menus: action.payload,
      };
    }
  },
  effects: {
    *initMenuList(action: Action, {
      select,
      put,
    }) {
      try {
        const menus = yield select((state: RootModelState) => state.sysModel.menus);
        if (menus && menus.length) {
          return menus;
        }
        const res: API.Response<Menu[]> = yield getMenuList();
        if (res.code === ERR_OK) {
          setStorage(MENU_KEY, res.data);
          yield put({
            type: "setMenus",
            payload: res.data
          });
          return res.data;
        }
      } catch (err) {
        yield message.error("网络错误，请重试");
      }
    }
  },
};

export default UserModel;
