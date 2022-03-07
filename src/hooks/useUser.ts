import {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUserinfoAction} from "@/models/createActions";
import {setStorage, removeStorage} from "@/pages/common/js/store";
import {TOKEN_KEY, USERINFO_KEY} from "@/pages/common/js/constants";

import type {Userinfo} from "@/pages/index.type";
import type {RootModelState} from "@/models/index.type";

export default () => {
  const dispatch = useDispatch();
  const currentUserinfo = useSelector((state: RootModelState) => state.userModel.userinfo);

  const currentUser = useMemo(() => {
    return currentUserinfo;
  }, [currentUserinfo]);

  const updateUserinfo = useCallback((payload: Userinfo) => {
    if (payload) {
      dispatch(createUserinfoAction(payload));
      setStorage(USERINFO_KEY, payload);
    }
  }, [currentUserinfo]);

  const updateToken = useCallback((token: string) => {
    if (token) {
      setStorage(USERINFO_KEY, token);
    }
  }, []);

  const logout = useCallback(() => {
    removeStorage(USERINFO_KEY);
    removeStorage(TOKEN_KEY);
  }, []);

  const cacheUserRelated = useCallback((token: string, userinfo: Userinfo) => {
    updateUserinfo(userinfo);
    updateToken(token);
  }, []);

  return {
    currentUser,
    updateUserinfo,
    updateToken,
    logout,
    cacheUserRelated,
  };
};
