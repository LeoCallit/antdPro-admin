import type {Request, Response} from "express";
import {SuccessModel, ErrorModel} from "./util";
import {find} from "lodash";

import type {LoginParams} from "@/pages/user/Login/index.type";

const TOKEN_LOCK = "$38ashdbj123fkldm";

function generateToken() {
  const token = `${String(Date.now())}_${TOKEN_LOCK}`;
  return btoa(token);
}

const token = generateToken();

export const USERS = [
  {
    id: 1,
    username: "admin",
    password: "123123",
    phone: "13600000000",
    email: "admin@react.com",
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    desc: "超级管理员",
    status: 1,
    roles: [1, 2, 3],
  },
  {
    id: 2,
    username: "user",
    password: "123123",
    phone: "13600000001",
    email: "user@react.com",
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    desc: "普通用户",
    status: 1,
    roles: [2],
  },
];

function login(req: Request, res: Response) {
  const {password, username} = req.body as LoginParams;
  const user = find(USERS, {username, password});
  if (!user) {
    res.status(500);
    return res.json(new ErrorModel(500, "账号密码错误！"));
  }
  return res.json(new SuccessModel({
    token,
    userinfo: user
  }));
}

function getUsersList(req: Request, res: Response) {
  return res.json(new SuccessModel(USERS));
}

export default {
  "POST /api/login": login,
  "GET /api/users/list": getUsersList,
};
