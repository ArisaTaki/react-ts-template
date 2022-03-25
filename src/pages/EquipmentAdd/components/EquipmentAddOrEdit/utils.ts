import { RcFile } from 'antd/es/upload/interface';

declare const ProgressStatuses: ['exception', 'success', 'active', 'normal'];

export interface IUploadType {
  fileList: RcFile[]
  fileBase64: string
}

export interface UploadProgressConfig {
  status: typeof ProgressStatuses[number]
  percent: number
}

export interface BrandTypeProps {
  brandInfo: {
    brand: string
    description?: string
  }
}
