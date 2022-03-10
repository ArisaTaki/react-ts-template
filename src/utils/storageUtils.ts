// login Status here
import store from 'store';

const USER_KEY = 'user_key';
const USER_TOKEN = 'user_token';

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
