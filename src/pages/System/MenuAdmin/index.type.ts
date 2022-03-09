interface TreeSelect {
  title?: string;
  id?: number;
}

export interface MenuState {
  treeData: Menu[];
  treeSelect: TreeSelect;
}

// 菜单对象
export interface Menu extends MenuParams {
  id: number; // ID

  [propName: string]: any;
}

// 菜单添加，修改时的参数类型
export interface MenuParams {
  id?: number; // ID,添加时可以没有id
  title: string; // 标题
  icon: string; // 图标
  url: string; // 链接路径
  parent: number | null; // 父级ID
  desc: string; // 描述
  sorts: number; // 排序编号
  status: number; // 状态，1启用，-1禁用
  children?: Menu[]; // 子菜单
}
