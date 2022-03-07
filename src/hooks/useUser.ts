// import {useCallback, useMemo} from "react";
// import {useDispatch, useSelector} from "umi";
// import {createUserinfoAction} from "@/models/createActions";
// import {setStorage, removeStorage} from "@/pages/common/js/store";
// import {TOKEN_KEY, USERINFO_KEY} from "@/pages/common/js/constants";
//
// import type {RootModelState} from "@/models/index.type";
// import type { Dispatch} from "umi";

import {useModel} from "umi";
import {useCallback} from "react";
import {removeStorage, setStorage} from "@/pages/common/js/store";
import {USERINFO_KEY} from "@/pages/common/js/constants";

export default () => {
  const {setInitialState} = useModel("@@initialState");

  const setCurrentUserinfo = useCallback((userinfo: API.Userinfo) => {
    if (userinfo) {
      setInitialState((s) => ({...s, currentUser: userinfo}));
      setStorage(USERINFO_KEY, userinfo);
    }
  }, []);

  const logout = useCallback(() => {
    setInitialState((s) => ({...s, currentUser: undefined}));
    removeStorage(USERINFO_KEY);
  }, []);

  return {
    setCurrentUserinfo,
    logout
  };
};
