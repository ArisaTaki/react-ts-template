import {
  get, del, post, put,
} from './request';
import { ApiData } from './entities';
import { ApiPaths } from '@/services/api-path';

const LargeFileRequestTimeOut = 5 * 60 * 1000;

export const ServicesApi = {
  login: (params: ApiData.Login.Params):
  Promise<ApiData.Login.ResponseData> => post(ApiPaths.login, params),

  getUserInfo: (): Promise<ApiData.GetUserInfo.ResponseData> => get(ApiPaths.getUserInfo),

  getCameraBrandsList: ():
  Promise<ApiData.GetAllCameraBrands.ResponseData> => get(ApiPaths.getCameraBrandList),

  uploadAttachment: (params: ApiData.UpdateAttachment.Params,
    uploadProgressEvent?: (e: ProgressEvent) => void):
  Promise<ApiData.UpdateAttachment.ResponseData> => {
    const { fileBinaryStream } = params;
    const formData = new FormData();
    formData.append('fileBinaryStream', fileBinaryStream);
    return post(ApiPaths.updateAttachment, formData, {
      timeout: LargeFileRequestTimeOut,
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
      onUploadProgress: uploadProgressEvent,
    });
  },

  addBrand: (params: ApiData.AddBrand.Params):
  Promise<ApiData.AddBrand.Response> => post(ApiPaths.addBrand, params),

  getBrandInfo: (params: ApiData.GetBrandInfo.Params):
  Promise<ApiData.GetBrandInfo.ResponseData> => get(ApiPaths.getBrandInfo.replace(':brandId', params.brandId)),

  editBrandInfo: (params: ApiData.EditBrand.Params):
  Promise<ApiData.EditBrand.Response> => post(ApiPaths.EditBrand.replace(':brandId',
    params.brandId), params),

  getCameraList: (params: ApiData.GetCameraListByBrand.Params):
  Promise<ApiData.GetCameraListByBrand.ResponseData> => get(ApiPaths.getCameraList.replace(':brandId', params.brandId)),

  delCameraList: (params: ApiData.DelCameraList.Params):
  Promise<ApiData.DelCameraList.Response> => del(ApiPaths.delCameraList, params),

  getCameraInfo: (params: ApiData.GetCameraInfo.Params):
  Promise<ApiData.GetCameraInfo.ResponseData> => get(ApiPaths.getCameraInfo.replace(':id', params.id)),

  updateCameraInfo: (params: ApiData.UpdateCameraInfo.Params):
  Promise<ApiData.UpdateCameraInfo.Response> => post(ApiPaths.updateCameraInfo, params),

  addCameraInfo: (params: ApiData.AddCameraInfo.Params):
  Promise<ApiData.AddCameraInfo.Response> => put(ApiPaths.addCameraInfo, params),

  searchCameras: (params: ApiData.SearchCameraInfos.Params):
  Promise<ApiData.SearchCameraInfos.Response> => post(ApiPaths.searchCameras, params),
};
