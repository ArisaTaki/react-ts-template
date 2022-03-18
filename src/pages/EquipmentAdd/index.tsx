import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Form, Input, Upload, Button, message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import { getBase64 } from '@/utils/fileUtils';

const cx = classNames.bind(styles);

interface IUploadType {
  fileList: RcFile[]
  loading: boolean
  fileBase64: string
}

const { uploadAttachment } = ServicesApi;

const EquipmentAdd: React.FC = () => {
  const [uploadFile, setUploadFile] = useState<IUploadType>({
    fileList: [],
    loading: false,
    fileBase64: '',
  });

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

  const showImagePreview = (file: UploadFile) => {
    console.log(file);
  };

  const uploadMethod = () => {
    console.log();
  };

  const uploadButton = (
    <div>
      {uploadFile.loading ? <LoadingOutlined /> : <PlusOutlined />}
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
          <ImgCrop rotate>
            <Upload
              fileList={uploadFile.fileList}
              listType="picture-card"
              showUploadList={false}
              onRemove={() => {
                setUploadFile({ ...uploadFile, fileList: [] });
              }}
              onPreview={showImagePreview}
              customRequest={uploadMethod}
            >
              {uploadFile.fileList[1] ? <img src={uploadFile.fileList[1].webkitRelativePath} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </ImgCrop>
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
