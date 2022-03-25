export interface BaseResponse<T = any> {
  // 返回message
  message: string
  // 状态code：200 success。201 error，之后再细分
  code: string
  data: T
}

export interface UserTokenKeyInfo {
  //  token
  access_token: string
  // id
  access_id: string
}

export interface UserInfo {
  // 头像
  avatar: string
  // 昵称
  name: string
  // 公司名
  companyName: string
}

export interface EthernetCardVO {
  // IPv4 地址的整数表示
  ipv4: number,
  // MAC 地址的整数表示 (后 48 位)
  mac: number,
}

export interface CameraInfo {
  // 品牌
  brand: string;
  // 备注
  description: string;
  // 网卡信息
  ethernetCards: EthernetCardVO[];
  // 设备ID
  id: number;
  // 设备安装位置
  location: string;
  // 设备型号
  modal: string;
  // 视频标题
  title: string;
  // 镜头分类
  type: string;
}

export interface CameraBrand {
  // Id
  brandId: string;
  // 品牌
  brand: string;
  // 此品牌情况
  description?: string;
  // 图片URL
  imageUrl?: string;
}

export interface BrandInfo {
  // 品牌
  brand: string;
  // 此品牌情况
  description?: string;
  // 图片URL
  imageUrl: string;
}

export namespace ApiData {
  // 用户登录信息
  namespace Login {
    interface Params {
      // 账户
      userName: string
      // 密码
      passWord: string
    }
    type ResponseData = BaseResponse<UserTokenKeyInfo>;
  }

  // 用户基本信息
  namespace GetUserInfo {
    type ResponseData = BaseResponse<UserInfo>;
  }

  // 全部设备品牌列表
  namespace GetAllCameraBrands {
    interface ResponseData extends BaseResponse<ResponseData> {
      brands: CameraBrand[]
    }
  }
  // 上传
  namespace UpdateAttachment {
    interface Params {
      fileBinaryStream: string
    }

    interface ResponseData extends BaseResponse<ResponseData> {
      // 添加URL （拟定）
      imageUrl: string
    }
    type Response = BaseResponse<ResponseData>;
  }

  // 增加分类
  namespace AddBrand {
    interface Params {
      // 品牌
      brand: string;
      // 备注
      description?: string;
      // 图片路径
      imgUrl: string;
    }

    type Response = BaseResponse;
  }

  // 获取某一个类型的info数据
  namespace GetBrandInfo {
    interface Params {
      // Id
      brandId: string;
    }
    interface ResponseData extends BaseResponse<ResponseData> {
      brandInfo: BrandInfo
    }

    type Response = BaseResponse<ResponseData>;
  }

  // 更改某个类型的info数据
  namespace EditBrand {
    interface Params {
      brandId: string;
      // 品牌
      brand: string;
      // 备注
      description?: string;
      // 图片路径
      imgUrl: string;
    }

    type Response = BaseResponse;
  }
}
