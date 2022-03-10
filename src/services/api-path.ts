const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/mock';

export const ApiPaths = {
  login: '/user/login',
  getUserInfo: '/user/user-info',
};
