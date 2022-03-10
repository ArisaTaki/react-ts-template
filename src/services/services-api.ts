import {
  get, del, post, put,
} from './request';
import { ApiData } from './entities';
import { ApiPaths } from '@/services/api-path';

export const ServicesApi = {
  login: (params: ApiData.UserLoginInfo.Params):
  Promise<ApiData.UserLoginInfo.ResponseData> => post(ApiPaths.login, params),

  getUserInfo: (): Promise<ApiData.UserInfo.ResponseData> => get(ApiPaths.getUserInfo),
};
