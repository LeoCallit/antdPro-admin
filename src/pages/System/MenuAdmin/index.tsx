import {useCallback, useMemo} from "react";
import {useMount, useSetState} from "react-use";
import {Button, Table, Tree} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {ModalForm, ProFormSwitch, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import {PlusCircleOutlined} from "@ant-design/icons";
import {cloneDeep} from "lodash";
import {dataToJson} from "@/common/js/util";
import useModal from "@/hooks/useModal";
import {useDispatch} from "umi";

import type {Menu, MenuState} from "@/pages/System/MenuAdmin/index.type";
import type { TableColumnsType} from "antd";

import "./index.less";
import {createMenusAction} from "@/models/createActions";

/** 构建表格字段 **/
const tableColumns: TableColumnsType<Menu> = [
  {
    title: "序号",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "图标",
    dataIndex: "icon",
    key: "icon",
  },
  {
    title: "菜单名称",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "路径",
    dataIndex: "url",
    key: "url",
    render: (v: string | null) => {
      return v ? `/${v.replace(/^\//, "")}` : "";
    },
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "父级",
    dataIndex: "parent",
    key: "parent",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (v: number) =>
      v === 1 ? (
        <span style={{color: "green"}}>启用</span>
      ) : (
        <span style={{color: "red"}}>禁用</span>
      ),
  },
  {
    title: "操作",
    key: "control",
    width: 120,
  },
];

export default () => {
  const dispatch = useDispatch();
  const [state, setState] = useSetState<MenuState>({
    treeData: [],
    treeSelect: {}
  });
  const {visible, form, show, hide, submit, operateTitle} = useModal();
  const {treeData, treeSelect} = state;

  useMount(async() => {
    const menus: any = await dispatch(createMenusAction());
    if (menus) {
      setState({
        treeData: menus,
      });
    }
  });

  /** 处理原始数据，将原始数据处理为层级关系 **/
  const sourceData = useMemo(() => {
    const d: Menu[] = cloneDeep(treeData);
    d.forEach((item: Menu) => {
      item.key = String(item.id);
    });
    // 按照sort排序
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });
    return dataToJson(null, d) || [];
  }, [treeData]);

  /** 点击树目录时触发 **/
  const onTreeSelect = useCallback((keys, e) => {
    let newTreeSelect = {};
    if (e.selected) {
      // 选中
      newTreeSelect = {title: e.node.title, id: e.node.id};
    }
    setState({
      treeSelect: newTreeSelect
    });
  }, []);

  /** 构建表格数据 **/
  const tableData = useMemo(() => {
    const {treeData: data} = state;

    return data
      .filter((item: Menu) => item.parent === (Number(treeSelect.id) || null))
      .map((item: Menu, index) => {
        return {
          key: index,
          id: item.id,
          icon: item.icon,
          parent: item.parent,
          title: item.title,
          url: item.url,
          desc: item.desc,
          sorts: item.sorts,
          status: item.status,
          serial: index + 1,
        };
      });
  }, [treeData, treeSelect.id]);

  return (
    <PageContainer title="菜单管理">
      <div className="page-menu-admin">
        <div className="l">
          <div className="title">目录结构</div>
          <Tree
            defaultExpandedKeys={["0"]}
            onSelect={onTreeSelect}
            selectedKeys={[String(treeSelect.id)]}
            treeData={sourceData}
          />
        </div>

        <div className="r">
          <div className="searchBox">
            <ul>
              <li>
                <Button
                  onClick={show}
                  type="primary"
                  icon={<PlusCircleOutlined/>}
                >
                  {`添加${treeSelect.title || "根级"}子菜单`}
                </Button>
              </li>
            </ul>
          </div>
          <Table
            <Menu>
            className="diy-table"
            columns={tableColumns}
            dataSource={tableData}
            pagination={{
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条数据`,
            }}
          />
        </div>
      </div>

      <ModalForm
        form={form}
        visible={visible}
        modalProps={{
          onCancel: hide,
        }}
        title={`${operateTitle}${state.treeSelect.title || "根级"}子菜单`}
        onFinish={async (values) => {
          await submit({
            params: {
              ...values,
              status: values.status ? 1 : 2
            },
            request: () => Promise.resolve(),
          });
        }}
      >
        <ProFormText
          width="md"
          name="title"
          label="菜单名"
          tooltip="最长为 6 位"
          placeholder="请输入菜单名"
          rules={[
            {required: true}
          ]}
          fieldProps={{
            maxLength: 6
          }}
        />
        <ProFormText
          width="md"
          name="url"
          label="菜单链接"
          placeholder="请输入菜单链接"
          rules={[
            {required: true}
          ]}
        />
        <ProFormText
          width="md"
          name="icon"
          label="图标"
          placeholder="请输入图标"
        />
        <ProFormTextArea
          width="md"
          name="desc"
          label="描述"
          placeholder="请输入描述"
          tooltip="最长为 30 位"
          fieldProps={{
            maxLength: 30,
            showCount: true
          }}
        />
        <ProFormText
          width="md"
          name="sorts"
          label="排序"
          placeholder="请输入排序"
          rules={[
            {required: true}
          ]}
        />
        <ProFormSwitch
          name="status"
          label="状态"
          checkedChildren="启用"
          unCheckedChildren="禁用"
          initialValue
        />
      </ModalForm>
    </PageContainer>
  );
};
