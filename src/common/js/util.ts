import type {Menu} from "@/pages/System/MenuAdmin/index.type";

/** 工具 - 递归将扁平数据转换为层级数据 **/
export function dataToJson(one: Menu | null, treeData: Menu[]): Menu[] | any {
  let kids: Menu[];
  if (!one) {
    kids = treeData.filter((item: Menu) => !item.parent);
  } else {
    kids = treeData.filter((item: Menu) => item.parent === one.id);
  }
  kids.forEach((item: Menu) => (item.children = dataToJson(item, treeData) as Menu[]));
  return kids.length ? kids : null;
}
