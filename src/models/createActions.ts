import type {Action} from "@/models/index.type";

export function createMenusAction(): Action {
  return {
    type: "sysModel/initMenuList"
  };
}
