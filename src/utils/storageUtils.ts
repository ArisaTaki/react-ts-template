// login Status here
import store from 'store';
import { ApiData } from '@/services/entities';

const USER_KEY = 'user_key';
const USER_TOKEN = 'user_token';
const USER_INFO = 'user_info';

export const saveUserInfo = (userInfo: ApiData.UserInfo.ResponseData) => {
  store.set(USER_INFO, userInfo);
};

export const getUserInfoStore = () => store.get(USER_INFO);

export const deleteUserInfo = () => {
  store.remove(USER_INFO);
};

export const saveUser = (user: string, token: string) => {
  store.set(USER_KEY, user);
  store.set(USER_TOKEN, token);
};

export const getUser = () => store.get(USER_KEY);

export const getToken = () => store.get(USER_TOKEN);

export const deleteUser = () => {
  store.remove(USER_KEY);
  store.remove(USER_TOKEN);
};
