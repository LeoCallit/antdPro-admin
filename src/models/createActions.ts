import type {Userinfo} from "@/pages/index.type";
import type {Action} from "@/models/index.type";

export function createUserinfoAction(payload: Userinfo): Action {
  return {
    type: "userModel/setUserinfo",
    payload
  };
}
