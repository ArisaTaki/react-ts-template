import axios from 'axios';
import { mockApiPath, onlineApiPath } from '@/constant/constants';
import { getToken, getUser } from '@/utils/storageUtils';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = mockApiPath;
}
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = onlineApiPath;
}
const instance = axios.create({ timeout: 10 * 1000 });
instance.defaults.headers.get['Content-type'] = 'application/json';
instance.defaults.headers.post['Content-type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    if (getToken() && config.headers) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    const res = error.response.data;
    return Promise.reject(res);
  },
);

export function get<P = any, R = any>(path: string, params?: P): Promise<R> {
  return instance.get<R>(path, { params }).then((res) => res.data);
}
export function put<P = any, R = any>(path: string, params?: P): Promise<R> {
  return instance.put<R>(path, params).then((res) => res.data);
}

export function post<P = any, R = any>(path: string, params?: P): Promise<R> {
  return instance.post<R>(path, params).then((res) => res.data);
}

export function del<P = any, R = any>(path: string, params?: P): Promise<R> {
  return instance.delete<R>(path, { data: params }).then((res) => res.data);
}
