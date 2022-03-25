const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/mock';

export const ApiPaths = {
  login: '/user/login',
  getUserInfo: '/user/user-info',
  getCameraList: '/camera/categories',
  updateAttachment: '/attachment/upload-file',
  addBrand: '/brand/add',
  EditBrand: '/brand/:brandId',
  getBrandInfo: '/brand/:brandId',
};
