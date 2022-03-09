import type {Request, Response} from "express";
import {SuccessModel, ErrorModel, filterQueryData} from "./util";
import {find, filter} from "lodash";

import type {LoginParams} from "@/pages/user/Login/index.type";

const TOKEN_LOCK = "$38ashdbj123fkldm";

function generateToken() {
  const token = `${String(Date.now())}_${TOKEN_LOCK}`;
  return btoa(token);
}

const token = generateToken();

export let USERS: API.Userinfo[] = [
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
    return res.json(new ErrorModel({
      code: 500,
      message: "账号密码错误！",
    }));
  }
  return res.json(new SuccessModel({
    token,
    userinfo: user
  }));
}

function getUsersList(req: Request, res: Response) {
  const {username, phone, email, avatar, desc, status} = req.query;
  const filterData = filterQueryData<Omit<API.Userinfo, "id" | "password" | "roles">>(USERS, {
    username, phone, email, avatar, desc, status
  });
  return res.json(new SuccessModel(filterData));
}

function createUser(req: Request, res: Response) {
  const {
    username,
    password,
    phone,
    email,
    avatar,
    desc,
    status,
  } = req.body;
  if (!username || !password) {
    return res.json(new ErrorModel({
      code: 40001,
      message: "username,password is require"
    }));
  }
  const newUserItem: API.Userinfo = {
    id: USERS.length + 1,
    username,
    password,
    phone,
    email,
    avatar,
    desc,
    status,
    roles: [],
  };

  USERS.push(newUserItem);
  return res.json(new SuccessModel({}));
}

function delUser(req: Request, res: Response) {
  const {id} = req.body;
  if (!id) {
    return res.json(new ErrorModel({
      code: 40001,
      message: "id is require"
    }));
  }

  USERS = filter(USERS, (u) => u.id !== Number(id));
  return res.json({
    code: 200,
    data: true,
  });
}

function editUser(req: Request, res: Response) {
  const {
    id,
    username,
    password,
    phone,
    email,
    avatar,
    desc,
    status,
  } = req.body;
  if (!id) {
    return res.json(new ErrorModel({
      code: 40001,
      message: "id is require"
    }));
  }
  const patchIndex = USERS.findIndex(u => u.id === id);
  if (patchIndex > -1) {
    const patchItem = {
      id,
      username,
      password,
      phone,
      email,
      avatar,
      desc,
      status,
      roles: USERS[patchIndex].roles,
    };
    USERS[patchIndex] = patchItem;
    return res.json(new SuccessModel(patchItem));
  }
  res.status(500);
  return res.json({
    code: 502,
    message: "params is error"
  });
}

export default {
  "POST /api/login": login,
  "GET /api/users/list": getUsersList,
  "POST /api/users/create": createUser,
  "POST /api/users/delUser": delUser,
  "POST /api/users/editUser": editUser,
};
