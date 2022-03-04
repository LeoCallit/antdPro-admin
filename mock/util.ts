interface ResponseModel {
  data?: any;
  code: number;
  message?: string;
}

class BaseResponseModel implements ResponseModel {
  data?: any;
  code: number;
  message?: string;

  constructor(
    code: number,
    data?: any,
    message?: string
  ) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }
}

export class SuccessModel extends BaseResponseModel {
  constructor(data?: any) {
    super(200, data);
  }
}

export class ErrorModel extends BaseResponseModel {
  constructor(code: number, message: string, data?: any) {
    super(code, data, message);
  }
}

// class BaseModel {
//   data: any;
//   message: string;
//   constructor(data: any, message: string) {
//     if (typeof data === "string") {
//       this.message = data;
//       data = null;
//       message = null;
//     }
//     if (data) {
//       this.data = data;
//     }
//     if (message) {
//       this.message = message;
//     }
//   }
// }

// class SuccessModel extends BaseModel {
//   constructor(data, message) {
//     super(data, message);
//     this.errno = 0;
//   }
// }
//
// class ErrorModel extends BaseModel {
//   constructor(data, message) {
//     super(data, message);
//     this.errno = -1;
//   }
// }

// module.exports = {
//   SuccessModel,
//   ErrorModel
// }
