import {useCallback, useMemo} from "react";
import {useSetState} from "react-use";
import {Form, message} from "antd";
import {ERR_OK} from "@/common/js/constants";

import type {MutableRefObject} from "react";
import type {ActionType} from "@ant-design/pro-table";

interface ModalState {
  visible: boolean; // 是否显示
  operateType: API.OperateType; // 操作类型
  record?: any; // 编辑的内容
}

interface SubmitOptions<T> {
  id?: number; // 编辑 id
  params: T; // 参数
  request: (params: T) => Promise<any>, // 提交方法
  onSuccess?: (result: any) => void; // 成功回掉
  onError?: (err: any) => void;// 失败回掉
}

const operateTitle = {
  create: "新增",
  edit: "修改",
  see: "查看"
};

export default (actionRef?: MutableRefObject<ActionType | undefined>) => {
  const [state, setState] = useSetState<ModalState>({
    visible: false,
    operateType: "create",
  });
  const [form] = Form.useForm();

  const show = useCallback(() => {
    setState({
      visible: true,
    });
  }, []);

  const hide = useCallback(() => {
    setState({
      visible: false,
      operateType: "create",
    });
    form.resetFields();
  }, []);

  const edit = useCallback((record, operateType?: API.OperateType) => {
    show();
    form.setFieldsValue(record);
    setState({
      record,
      operateType: operateType || "edit",
    });
  }, []);

  const hasEdit = useMemo(() => {
    return state.operateType === "edit";
  }, [state.operateType]);

  const hasLook = useMemo(() => {
    return state.operateType === "see";
  }, [state.operateType]);

  async function submit<T>(options: SubmitOptions<T>) {
    const {operateType} = state;
    const {params, request, onSuccess, onError} = options;
    const pars: any = {
      ...params
    };
    try {
      if (operateType === "see") {
        return;
      }
      if (operateType === "edit" && request) {
        pars.id = state.record.id;
      }
      const result: any = await request(pars);

      if (result && result.code === ERR_OK) {
        if (onSuccess) {
          onSuccess(result);
        }
        if (operateType === "edit") {
          message.success("编辑成功！");
        } else {
          message.success("添加成功！");
        }
        if (actionRef?.current?.reloadAndRest) {
          actionRef.current.reloadAndRest();
        }
      } else {
        if (onError) {
          onError(result);
        }
      }
    } catch (err) {
      if (onError) {
        onError(err);
      }
    } finally {
      hide();
    }
  }

  return {
    ...state,
    form,
    show,
    hide,
    edit,
    hasEdit,
    hasLook,
    submit,
    operateTitle: operateTitle[state.operateType],
    setModalState: setState,
  };
};
