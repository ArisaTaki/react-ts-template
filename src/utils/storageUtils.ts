// login Status here
import store from 'store';

const USER_KEY = 'user_key';
const USER_TOKEN = 'user_token';
const USER_INFO = 'user_info';

export const getUserInfoStore = () => store.get(USER_INFO);

export const deleteUserInfo = () => {
  store.remove(USER_INFO);
};

export const getUser = () => store.get(USER_KEY);

export const getToken = () => store.get(USER_TOKEN);

export const deleteUser = () => {
  store.remove(USER_KEY);
  store.remove(USER_TOKEN);
};
