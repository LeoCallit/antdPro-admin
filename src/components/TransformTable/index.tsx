import { useCallback } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";

import type { FC } from "react";
import type { ProTableProps } from "@ant-design/pro-table";
import type { PageContainerProps } from "@ant-design/pro-layout";

interface Props {
  showHeader?: boolean;
  lineIndex?: boolean;
  pageContainerProps?: PageContainerProps;
  tableConf?: ProTableProps<any, any>;
}

type TableDefaultConf = Pick<ProTableProps<any, any>, "rowKey" | "pagination" | "search">;

const TransformTable: FC<Props> = (props) => {
  const { pageContainerProps, children, tableConf, showHeader = true, lineIndex = true } = props;

  const setDefaultConf = useCallback(() => {
    if (lineIndex && tableConf?.columns) {
      tableConf.columns = [
        {
          dataIndex: "index",
          valueType: "indexBorder",
          width: 48,
        },
        ...tableConf.columns,
      ];
    }

    const tableDefaultConfList: TableDefaultConf = {
      rowKey: "id",
      pagination: {
        pageSize: 10,
        pageSizeOptions: ["10", "20"],
      },
    };

    if (tableConf) {
      Object.keys(tableDefaultConfList).forEach((key) => {
        if (!tableConf[key]) {
          tableConf[key] = tableDefaultConfList[key];
        }
      });
    }
  }, [tableConf, pageContainerProps]);

  const renderCom = () => {
    setDefaultConf();

    if (showHeader) {
      return (
        <PageContainer {...pageContainerProps}>
          <ProTable {...tableConf} />
          {children}
        </PageContainer>
      );
    }
    return (
      <>
        <ProTable {...tableConf} />
        {children}
      </>
    );
  };

  return renderCom();
};

export default TransformTable;
