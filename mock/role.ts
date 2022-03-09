import {SuccessModel, ErrorModel, filterQueryData} from "./util";
import {filter} from "lodash";
import moment from "moment";

import type {Request, Response} from "express";
import type {Role, RoleParams} from "@/pages/System/RoleAdmin/index.type";

// 所有的角色数据
export let ROLES: Role[] = [
  {
    id: 1,
    title: "超级管理员",
    desc: "超级管理员拥有所有权限",
    sorts: 1,
    status: 1,
    mark: "role_admin",
    menuAndPowers: [
      {menuId: 1, powers: []},
      {menuId: 2, powers: []},
      {menuId: 3, powers: [1, 2, 3, 4, 5]},
      {menuId: 4, powers: [6, 7, 8, 9, 18]},
      {menuId: 5, powers: [10, 11, 12, 13]},
      {menuId: 6, powers: [14, 15, 16, 17]},
    ],
  },
  {
    id: 2,
    title: "普通用户",
    desc: "普通用户",
    sorts: 2,
    status: 1,
    mark: "role_user",
    menuAndPowers: [
      {menuId: 1, powers: []},
      {menuId: 2, powers: []},
      {menuId: 3, powers: [3]},
      {menuId: 4, powers: [8]},
      {menuId: 5, powers: [12]},
      {menuId: 6, powers: [16]},
    ],
  },
  {
    id: 3,
    title: "运维人员",
    desc: "运维人员不能删除对象",
    sorts: 3,
    status: 1,
    mark: "role_operation",
    menuAndPowers: [
      {menuId: 1, powers: []},
      {menuId: 2, powers: []},
      {menuId: 3, powers: [3]},
      {menuId: 4, powers: [8]},
      {menuId: 5, powers: [12]},
      {menuId: 6, powers: [16]},
    ],
  },
];

function getRolesList(req: Request, res: Response) {
  const {title ,desc ,sorts ,status ,mark} = req.query;
  const filterData = filterQueryData<Omit<RoleParams, "menuAndPowers">>(ROLES,{
    title ,desc ,sorts ,status ,mark
  });
  return res.json(new SuccessModel(filterData));
}

function createRole(req: Request, res: Response) {
  const {
    title,
    desc,
    sorts,
    status,
    mark,
  } = req.body;
  const roleItem = {
    id: ROLES.length + 1,
    title,
    desc,
    sorts,
    status,
    mark,
    menuAndPowers: [],
    createTime: moment().format("YYYY-MM-DD hh:mm:ss"),
  };
  ROLES.push(roleItem);
  return res.json(new SuccessModel(roleItem));
}

function delRole(req: Request, res: Response) {
  const {
    id,
  } = req.body;
  if (!id) {
    return res.json(new ErrorModel({
      code: 40001,
      message: "id is require"
    }));
  }
  ROLES = filter(ROLES, (i) => i.id !== id);
  return res.json(new SuccessModel(true));
}

function editRole(req: Request, res: Response) {
  const {
    id,
    title,
    desc,
    sorts,
    status,
  } = req.body;
  if (!id) {
    return res.json(new ErrorModel({
      code: 40001,
      message: "id is require"
    }));
  }
  const patchIndex = ROLES.findIndex(i => i.id === id);
  if (patchIndex > -1) {
    const roleItem = {
      ...ROLES[patchIndex],
      title,
      desc,
      sorts,
      status,
    };
    ROLES[patchIndex] = roleItem;
    return res.json({
      code: 200,
      data: roleItem,
    });
  }
  res.status(500);
  return res.json({
    code: 502,
    message: "params is error"
  });
}

export default {
  "GET /api/role/list": getRolesList,
  "POST /api/role/createRole": createRole,
  "POST /api/role/delRole": delRole,
  "POST /api/role/editRole": editRole,
};
