import { filter } from "lodash";

interface ResponseModel {
  data?: any;
  code: number;
  message?: string;
}

class BaseResponseModel implements ResponseModel {
  data?: any;
  code: number;
  message?: string;

  constructor(obj: ResponseModel) {
    const {code, message, data} = obj;
    this.code = code;
    this.message = message;
    this.data = data || null;
  }
}

export class SuccessModel extends BaseResponseModel {
  constructor(data: any) {
    super({
      data,
      code: 200,
    });
  }
}

export class ErrorModel extends BaseResponseModel {
}

export function filterQueryData<T>(data: T[], obj: any) {
  const filterObj: any = {};
  Object.keys(obj).forEach((key: string) => {
    if (key === "status" && obj[key]) {
      obj[key] = Number(obj[key]);
    }
    if (obj[key]) {
      filterObj[key] = obj[key];
    }
  });
  return filter(data, filterObj);
}
