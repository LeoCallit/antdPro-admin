import type {Request, Response} from "express";
import type {Menu} from "@/pages/System/MenuAdmin/index.type";
import {SuccessModel} from "./util";

// 菜单数据
const MENUS: Menu[] = [
  {
    id: 1,
    title: "首页",
    icon: "icon-home",
    url: "/home",
    parent: null,
    desc: "首页",
    sorts: 0,
    status: 1,
  },
  {
    id: 2,
    title: "系统管理",
    icon: "icon-setting",
    url: "/system",
    parent: null,
    desc: "系统管理目录分支",
    sorts: 1,
    status: 1,
  },
  {
    id: 3,
    title: "用户管理",
    icon: "icon-user",
    url: "/system/useradmin",
    parent: 2,
    desc: "系统管理/用户管理",
    sorts: 0,
    status: 1,
  },
  {
    id: 4,
    title: "角色管理",
    icon: "icon-team",
    url: "/system/roleadmin",
    parent: 2,
    desc: "系统管理/角色管理",
    sorts: 1,
    status: 1,
  },
  {
    id: 5,
    title: "权限管理",
    icon: "icon-safetycertificate",
    url: "/system/poweradmin",
    parent: 2,
    desc: "系统管理/权限管理",
    sorts: 2,
    status: 1,
  },
  {
    id: 6,
    title: "菜单管理",
    icon: "icon-appstore",
    url: "/system/menuadmin",
    parent: 2,
    desc: "系统管理/菜单管理",
    sorts: 3,
    status: 1,
  },
];

function getMenuList(req: Request, res: Response) {
  return res.json(new SuccessModel(MENUS));
}

export default {
  "GET /api/menu/list": getMenuList,
};
