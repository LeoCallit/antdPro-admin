import {useMemo, useRef} from "react";
import {Button, Tooltip, Popconfirm, message} from "antd";
import TransformTable from "@/components/TransformTable";
import {ModalForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import {
  PlusOutlined,
  EyeOutlined,
  ToolOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import useModal from "@/hooks/useModal";
import {getRoleList, delRole, editRole, createRole} from "@/services/sys";
import {ERR_OK} from "@/common/js/constants";

import type {ProColumns, ActionType} from "@ant-design/pro-table";
import type {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import type {Role} from "@/pages/System/RoleAdmin/index.type";

const RoleMarkKey = "role";

export default () => {
  const actionRef = useRef<ActionType>();
  const {form, visible, show, hide, edit, submit, operateType, operateTitle} = useModal(actionRef);

  const columns: ProColumns<Role>[] = [
    {
      title: "角色名称",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "角色标识",
      key: "mark",
      dataIndex: "mark"
    },
    {
      title: "描述",
      key: "desc",
      dataIndex: "desc",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      valueEnum: {
        1: "启用",
        2: "禁用"
      }
    },
    {
      title: "编辑",
      dataIndex: "option",
      valueType: "option",
      render: (dom, entity) => [
        <Tooltip
          key="edit"
          placement="top"
          title="修改">
          <ToolOutlined
            onClick={() => edit({
              ...entity,
              status: Number(entity.status) === 1,
              mark: entity.mark.split("_")[1],
            })}
          />
        </Tooltip>,
        <Tooltip placement="top" title="查看" key="see">
          <EyeOutlined onClick={() => edit(entity, "see")}/>
        </Tooltip>,
        <Tooltip placement="top" title="分配权限" key="assign">
          <EditOutlined />
        </Tooltip>,
        <Tooltip
          key="remove"
          placement="top"
          title="删除">
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={async() => {
              const delResult = await delRole({
                id: entity.id
              });
              if (delResult.code === ERR_OK) {
                message.success("删除成功!");
                actionRef.current?.reload();
              }
            }}
            okText="是的"
            cancelText="取消"
          >
            <DeleteOutlined/>
          </Popconfirm>
        </Tooltip>
      ],
    },
  ];

  const justSee = useMemo(() => {
    return operateType === "see";
  }, [operateType]);

  return (
    <>
      <TransformTable
        tableConf={{
          headerTitle: "用户管理",
          actionRef,
          request: getRoleList,
          columns: columns as ProDescriptionsItemProps<API.Userinfo>[],
          toolBarRender: () => [
            <Button
              key="create"
              type="primary"
              onClick={show}
            >
              <PlusOutlined/> 新建
            </Button>,
          ],
        }}
      />
      <ModalForm
        title={operateTitle}
        visible={visible}
        form={form}
        modalProps={{
          onCancel: hide
        }}
        onFinish={(values) => submit({
          params: {
            ...values,
            status: values.status ? 1 : 2,
            mark: `${RoleMarkKey}_${values.mark}`
          },
          request: operateType === "edit" ? editRole : createRole,
        })}
      >
        <ProFormText
          width="md"
          name="mark"
          label="角色标识"
          rules={[
            {required: true}
          ]}
          disabled={justSee}
          fieldProps={{
            maxLength: 10,
            addonBefore: RoleMarkKey
          }}
        />
        <ProFormText
          width="md"
          name="title"
          label="角色名"
          tooltip="最长为 10 位"
          placeholder="请输入角色名"
          rules={[
            {required: true}
          ]}
          disabled={justSee}
          fieldProps={{
            maxLength: 10
          }}
        />
        <ProFormDigit
          width="md"
          name="sorts"
          label="排序"
          placeholder="请输入排序"
          rules={[
            {required: true}
          ]}
          disabled={justSee}
        />
        <ProFormTextArea
          width="md"
          name="desc"
          label="描述"
          placeholder="请输入描述"
          tooltip="最长为 30 位"
          disabled={justSee}
          fieldProps={{
            maxLength: 30,
            showCount: true,
          }}
        />
        <ProFormSwitch
          name="status"
          label="状态"
          checkedChildren="启用"
          unCheckedChildren="禁用"
          initialValue
          disabled={justSee}
        />
      </ModalForm>
    </>
  );
};
