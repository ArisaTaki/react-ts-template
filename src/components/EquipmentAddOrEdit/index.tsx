import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button, Form, Input, message, Progress, Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useHistory } from 'react-router-dom';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/services-api';
import { BrandTypeProps, IUploadType, UploadProgressConfig } from '@/components/EquipmentAddOrEdit/utils';

const cx = classNames.bind(styles);

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label}不可为空',
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface EquipmentAddOrEditProps {
  checkFile: (file: RcFile | File) => boolean
  cropOkEvent: (file: File) => void
  uploadMethod: () => void
  imgUrl: string
  uploadFile: IUploadType
  uploading: boolean
  progressInfo: UploadProgressConfig
  shouldSubmit: boolean
}

const { addBrand } = ServicesApi;

const EquipmentAddOrEdit: React.FC<EquipmentAddOrEditProps> = ({
  checkFile,
  cropOkEvent,
  uploadMethod,
  imgUrl,
  uploadFile,
  uploading,
  progressInfo,
  shouldSubmit,
}) => {
  const history = useHistory();
  const onFinish = (values: BrandTypeProps) => {
    const { brand, description } = values.brandInfo;
    addBrand({ description, brand, imgUrl }).then((res) => {
      message.success('添加成功');
      history.push(routerPath.Equipment);
    }).catch((err) => {});
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['brandInfo', 'brand']} label="品牌" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="图片"
        extra={uploadFile.fileList[0]?.name || 'example.jpg'}
      >
        <div>
          <ImgCrop rotate beforeCrop={checkFile} onModalOk={cropOkEvent}>
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={uploadMethod}
            >
              {uploadFile.fileBase64 ? <img src={uploadFile.fileBase64} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </ImgCrop>
          <div className={cx('parent')}>
            <Progress
              className={cx(uploading ? 'active' : 'close')}
              percent={progressInfo?.percent}
              status={progressInfo?.status}
            />
          </div>
        </div>
      </Form.Item>
      <Form.Item name={['brandInfo', 'description']} label="概述">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
        <Button type="primary" htmlType="submit" disabled={!shouldSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EquipmentAddOrEdit;
