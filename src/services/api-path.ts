const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/mock';

export const ApiPaths = {
  login: '/user/login',
  getUserInfo: '/user/user-info',
  getCameraBrandList: '/camera/categories',
  updateAttachment: '/attachment/upload-file',
  addBrand: '/brand/add',
  EditBrand: '/brand/:brandId',
  getBrandInfo: '/brand/:brandId',
  getCameraList: '/camera-list/:brandId',
  delCameraList: '/camera-list/del',
};
