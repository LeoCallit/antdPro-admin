import {useMemo, useRef} from "react";
import {Button, Tooltip, Popconfirm, message} from "antd";
import TransformTable from "@/components/TransformTable";
import {ModalForm, ProFormSwitch, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import {
  PlusOutlined,
  EyeOutlined,
  ToolOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import useModal from "@/hooks/useModal";
import {getUsersList, createUser, delUser, editUser} from "@/services/sys";

import type {ProColumns, ActionType} from "@ant-design/pro-table";
import type {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {ERR_OK} from "@/common/js/constants";

export default () => {
  const actionRef = useRef<ActionType>();
  const {form, visible, show, hide, edit, submit, operateType, operateTitle} = useModal(actionRef);

  const columns: ProColumns<API.Userinfo>[] = [
    {
      title: "用户名称",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "电话",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
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
      render: (dom, record) => [
        <Tooltip placement="top" title="查看" key="see">
          <EyeOutlined
            onClick={() => edit({
              ...record,
              status: record.status === 1
            }, "see")}
          />
        </Tooltip>,
        <Tooltip key="edit" placement="top" title="修改">
          <ToolOutlined
            onClick={() => edit({
              ...record,
              status: record.status === 1
            })}
          />
        </Tooltip>,
        <Tooltip placement="top" title="分配角色" key="assign">
          <EditOutlined/>
        </Tooltip>,
        <Tooltip
          key="remove"
          placement="top"
          title="删除">
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={async() => {
              try {
                const delResult = await delUser({
                  id: record.id
                });
                if (delResult.code === ERR_OK) {
                  message.success("删除成功！");
                  actionRef.current?.reload();
                }
              } catch (err) {
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
          request: getUsersList,
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
        form={form}
        visible={visible}
        modalProps={{
          onCancel: hide,
        }}
        onFinish={async(values) => {
          await submit({
            params: {
              ...values,
              status: values.status ? 1 : 2
            },
            request: operateType === "edit" ? editUser : createUser
          });
        }}
      >
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          tooltip="最长为 10 位"
          placeholder="请输入用户名"
          rules={[{required: true}]}
          disabled={justSee}
          fieldProps={{
            maxLength: 10,
          }}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[{required: true}]}
          disabled={justSee}
        />
        <ProFormText
          width="md"
          name="phone"
          label="电话"
          placeholder="请输入电话"
          disabled={justSee}
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
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
          disabled={justSee}
          initialValue
        />
      </ModalForm>
    </>
  );
};
