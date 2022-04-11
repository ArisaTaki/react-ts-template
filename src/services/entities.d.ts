// 在该文件内定义请求参数与响应参数的类型，并且导出，以供全局调用

export interface BaseResponse<T = any> {
  // 返回message
  message: string
  // 状态code：200 success。201 error，之后再细分
  code: string
  data: T
}

export namespace ApiData {
  // 带有返回值data的情况
  namespace Example {
    interface Params {
      example: string
    }

    interface ResponseData extends BaseResponse<ResponseData> {
      example: string
    }
    type Response = BaseResponse<ResponseData>;
  }

  // 没有返回值data的情况
  namespace ExampleNotRes {
    interface Params {
      example: string
    }

    type Response = BaseResponse;
  }
}
