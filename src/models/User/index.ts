import type {Model} from "dva";
import type {UserModelType} from "@/models/index.type";

const defaultState: UserModelType = {};

const UserModel: Model = {
  namespace: "userModel",
  state: defaultState,
  reducers: {},
  effects: {},
};

export default UserModel;
