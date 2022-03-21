import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Form, Input, Upload, Button, message, Progress,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import { getBase64 } from '@/utils/fileUtils';

const cx = classNames.bind(styles);

declare const ProgressStatuses: ['exception', 'success', 'active', 'normal'];

interface IUploadType {
  fileList: RcFile[]
  fileBase64: string
}

interface UploadProgressConfig {
  status: typeof ProgressStatuses[number]
  percent: number
}

const { uploadAttachment } = ServicesApi;

const EquipmentAdd: React.FC = () => {
  const fileTypeCases = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  const [uploadFile, setUploadFile] = useState<IUploadType>({
    fileList: [],
    fileBase64: '',
  });
  const [loading, setLoading] = useState(false);
  const [serviceImgUrl, setServiceImgUrl] = useState('');
  const [progressInfo, setProgressInfo] = useState<UploadProgressConfig>({ status: 'active', percent: 0 });

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label}不可为空',
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const uploadProgressEvent = (e: ProgressEvent) => {
    const percent = ((e.loaded / e.total) * 100);
    setProgressInfo({ ...progressInfo, percent, status: percent < 100 ? 'active' : 'success' });
  };

  const uploadMethod = () => {
    setLoading(true);
    getBase64(uploadFile.fileList[0]).then((res) => {
      uploadAttachment({ fileBinaryStream: res }, uploadProgressEvent).then((data) => {
        setLoading(false);
        setUploadFile({ ...uploadFile, fileBase64: res });
        setServiceImgUrl(data.imageUrl);
      }).catch((err) => {
        message.error('上传文件出错').then(() => {
          setLoading(false);
        });
      });
    });
  };

  const changeEvent = () => {
    console.log('changing');
  };

  const cropOkEvent = (file: File) => {
    // 这里的file是裁剪之后的file
    setUploadFile({ ...uploadFile, fileList: [file as RcFile] });
  };

  const checkFile = (file: RcFile | File): boolean => {
    if (fileTypeCases.filter((v) => file.type === v).length === 0) {
      message.error('请传入正确的格式文件').then(() => false);
    }
    return true;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div>种类添加</div>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label="品牌" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          extra="品牌例图"
        >
          <>
            <ImgCrop rotate beforeCrop={checkFile} onModalOk={cropOkEvent}>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                onChange={changeEvent}
                showUploadList={false}
                customRequest={uploadMethod}
              >
                {uploadFile.fileBase64 ? <img src={uploadFile.fileBase64} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </ImgCrop>
            <Progress
              percent={progressInfo?.percent}
              status={progressInfo?.status}
            />
          </>
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="概述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EquipmentAdd;
