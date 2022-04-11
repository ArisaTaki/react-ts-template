import {
  get, del, post, put,
} from './request';
import { ApiData } from './entities';
import { ApiPaths } from '@/services/api-path';

const LargeFileRequestTimeOut = 5 * 60 * 1000;

export const ServicesApi = {
  exampleApi: (params: ApiData.Example.Params):
  Promise<ApiData.Example.ResponseData> => put(ApiPaths.example, params),

  exampleHasResApi: (params: ApiData.ExampleNotRes.Params):
  Promise<ApiData.ExampleNotRes.Response> => post(ApiPaths.exampleNotRes, params),
};
