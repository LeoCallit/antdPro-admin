export interface Role extends RoleParams {
  id: number; // ID

  [propName: string]: any;
}

export interface RoleParams {
  id?: number; // ID,添加时可以没有id
  mark: string; // 角色标识
  title: string; // 角色名称
  desc: string; // 描述
  sorts: number; // 排序编号
  status: number; // 状态，1启用，-1禁用
  menuAndPowers?: {
    menuId: number;
    powers: number[];
  }[]; // 菜单权限和行为权限
}
