import {useRef} from "react";
import {
  PlusOutlined,
  EyeOutlined,
  ToolOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import {Button, Tooltip, Popconfirm} from "antd";
import TransformTable from "@/components/TransformTable";
import {getUsersList} from "@/services/system";

import type {ProColumns, ActionType} from "@ant-design/pro-table";
import type {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";

export default () => {
  const actionRef = useRef<ActionType>();
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
      render: () => [
        <Tooltip placement="top" title="查看" key="see">
          <EyeOutlined />
        </Tooltip>,
        <Tooltip key="edit" placement="top" title="修改">
          <ToolOutlined />
        </Tooltip>,
        <Tooltip placement="top" title="分配角色" key="assign">
          <EditOutlined />
        </Tooltip>,
        <Tooltip
          key="remove"
          placement="top"
          title="删除">
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={async() => {

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

  return (
    <TransformTable
      tableConf={{
        headerTitle: "用户管理",
        actionRef,
        request: getUsersList,
        columns: columns as ProDescriptionsItemProps<API.Userinfo>[],
        toolBarRender: () => [
          <Button key="create" type="primary">
            <PlusOutlined /> 新建
          </Button>,
        ],
      }}
    />
    // <ProTable<API.Userinfo>
    //   columns={columns}
    //   actionRef={actionRef}
    //   request={getUsersList}
    //   editable={{
    //     type: "multiple",
    //   }}
    //   columnsState={{
    //     persistenceKey: "pro-table-singe-demos",
    //     persistenceType: "localStorage",
    //   }}
    //   rowKey="id"
    //   search={{
    //     labelWidth: "auto",
    //   }}
    //   form={{
    //     // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    //     syncToUrl: (values, type) => {
    //       if (type === "get") {
    //         return {
    //           ...values,
    //           created_at: [values.startTime, values.endTime],
    //         };
    //       }
    //       return values;
    //     },
    //   }}
    //   pagination={{
    //     pageSize: 5,
    //   }}
    //   dateFormatter="string"
    //   headerTitle="高级表格"
    //   toolBarRender={() => [
    //     <Button key="button" icon={<PlusOutlined/>} type="primary">
    //       新建
    //     </Button>
    //   ]}
    // />
  );
};
