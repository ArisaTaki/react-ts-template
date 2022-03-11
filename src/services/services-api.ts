import {
  get, del, post, put,
} from './request';
import { ApiData } from './entities';
import { ApiPaths } from '@/services/api-path';

export const ServicesApi = {
  login: (params: ApiData.Login.Params):
  Promise<ApiData.Login.ResponseData> => post(ApiPaths.login, params),

  getUserInfo: (): Promise<ApiData.GetUserInfo.ResponseData> => get(ApiPaths.getUserInfo),

  getCameraBrandsList: ():
  Promise<ApiData.GetAllCameraBrands.ResponseData> => get(ApiPaths.getCameraList),
};
