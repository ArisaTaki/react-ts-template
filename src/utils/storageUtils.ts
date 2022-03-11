// login Status here
import store from 'store';
import { UserInfo, UserTokenKeyInfo } from '@/services/entities';

const USER_KEY = 'user_key';
const USER_TOKEN = 'user_token';
const USER_INFO = 'user_info';

export const saveUserInfo = (userInfo: UserInfo) => {
  store.set(USER_INFO, userInfo);
};

export const getUserInfoStore = () => store.get(USER_INFO);

export const deleteUserInfo = () => {
  store.remove(USER_INFO);
};

export const saveUser = (data: UserTokenKeyInfo) => {
  store.set(USER_KEY, data.access_id);
  store.set(USER_TOKEN, data.access_token);
};

export const getUser = () => store.get(USER_KEY);

export const getToken = () => store.get(USER_TOKEN);

export const deleteUser = () => {
  store.remove(USER_KEY);
  store.remove(USER_TOKEN);
};
