const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/mock';

// 请求API路径
export const ApiPaths = {
  example: '/example',
  exampleNotRes: '/has/example',
};
