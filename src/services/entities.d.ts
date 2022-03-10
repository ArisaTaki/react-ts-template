export interface BaseResponse<T = any> {
  // 返回message
  message: string
  // 状态code：200 success。201 error，之后再细分
  code: string
  data: T
}

export namespace ApiData {
  // 用户注册信息
  namespace UserRegisterInfo {
    interface Params {
      // 姓
      firstName: string
      // 名
      lastName: string
      // email
      email: string
      // password
      password: string
    }
  }

  // 用户登录信息
  namespace UserLoginInfo {
    interface Params {
      // 账户
      userName: string
      // 密码
      passWord: string
    }
    interface ResponseData extends BaseResponse<ResponseData> {
      //  token
      access_token: string
      // id
      access_id: string
    }
  }

  // 用户基本信息
  namespace UserInfo {
    interface ResponseData extends BaseResponse<ResponseData> {
      // 头像
      avatar: string
      // 昵称
      name: string
      // 公司名
      companyName: string
    }
  }

  // cardOrList 数据
  namespace CardOrListData {
    interface ResponseData extends BaseResponse {
      // item的id
      id: number
      // icon颜色
      color: string
      // vuetify icon
      icon: string
      // 副标题
      subtitle: string
      // 标题
      title: string
    }
  }

  // AsideRoutes 数据
  namespace Routes {
    interface ResponseData extends BaseResponse {
      // 路由信息
      title: string
      icon: string
      href?: string
      route?: ChildRoute[]
    }
  }
}
