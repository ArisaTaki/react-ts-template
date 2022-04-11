// 等后续程序有了更多需要处理的错误情况时这里的代码会被用到
export default class ApiError extends Error {
  constructor(readonly code: string, readonly message: string) {
    super(message);
  }
}
