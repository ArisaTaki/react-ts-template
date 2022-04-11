// 封装axios（Demo，改良由你自己来）
import axios, { AxiosRequestConfig } from 'axios';
import { mockApiPath, onlineApiPath } from '@/constant/constants';
import { getToken, getUser } from '@/utils/storageUtils';
import { moveToSystemError403Page } from '@/helpers/history';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = mockApiPath;
}
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = onlineApiPath;
}
const instance = axios.create({ timeout: 10 * 1000 });
instance.defaults.headers.get.Pragma = 'no-cache';
instance.defaults.headers.get['Cache-Control'] = 'no-cache, no-store';
instance.defaults.headers.get['Content-Type'] = 'application/json';
instance.defaults.headers.post['Content-Type'] = 'application/json';

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
    // 处理403
    if (res.code === '403') {
      moveToSystemError403Page(true);
      return Promise.reject(res);
    }
    return Promise.reject(res);
  },
);

export function get<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
Promise<R> {
  return instance.get<R>(path, { params, ...(config || {}) }).then((res) => res.data);
}

export function put<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
Promise<R> {
  return instance.put<R>(path, params, config).then((res) => res.data);
}

export function post<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
Promise<R> {
  return instance.post<R>(path, params, config).then((res) => res.data);
}

export function del<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
Promise<R> {
  return instance.delete<R>(path, { data: params, ...(config || {}) }).then((res) => res.data);
}
