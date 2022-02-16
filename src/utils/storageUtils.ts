// login Status here
import store from 'store';

const USER_KEY = 'user_key';

export const saveUser = (user: string) => {
  store.set(USER_KEY, user);
};

export const getUser = () => store.get(USER_KEY);

export const deleteUser = () => {
  store.remove(USER_KEY);
};
