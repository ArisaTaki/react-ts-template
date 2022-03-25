import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button, Form, Input, message, Progress, Spin, Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useHistory } from 'react-router-dom';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/services-api';
import { BrandTypeProps, IUploadType, UploadProgressConfig } from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit/utils';
import { getBase64 } from '@/utils/fileUtils';

const cx = classNames.bind(styles);

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label}不可为空',
};

const fileTypeCases = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface EquipmentAddOrEditProps {
  initData?: BrandTypeProps
  apiImgUrl?: string
  brandId?: string
  isEdit: boolean
}

const { uploadAttachment, addBrand, EditBrandInfo } = ServicesApi;

const EquipmentAddOrEdit: React.FC<EquipmentAddOrEditProps> = ({
  initData,
  apiImgUrl,
  brandId,
  isEdit,
}) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);
  const [uploadFile, setUploadFile] = useState<IUploadType>({
    fileList: [],
    fileBase64: '',
  });
  const [progressInfo, setProgressInfo] = useState<UploadProgressConfig>({ status: 'active', percent: 0 });
  const [uploading, setUploading] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [imgUrl, setImgUrl] = useState(isEdit ? apiImgUrl : '');

  const localUrlRef = useRef<string>('');

  useEffect(() => {
    setShouldSubmit(true);
  }, [imgUrl]);

  const onFinish = (values: BrandTypeProps) => {
    setPending(true);
    const { brand, description } = values.brandInfo;
    if (isEdit) {
      EditBrandInfo({
        brandId: brandId ?? '', brand, description, imgUrl: imgUrl ?? '',
      }).then((res) => {
        setPending(false);
        message.success('修改成功');
        history.push(routerPath.Equipment);
      }).catch((err) => {
        setPending(false);
      });
    } else {
      addBrand({ description, brand, imgUrl: imgUrl ?? '' }).then((res) => {
        setPending(false);
        message.success('添加成功');
        history.push(routerPath.Equipment);
      }).catch((err) => {
        setPending(false);
      });
    }
  };

  const uploadProgressEvent = (e: ProgressEvent) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    if (percent >= 100) {
      setUploadFile({ ...uploadFile, fileBase64: localUrlRef.current });
    }
    setUploading(true);
    setProgressInfo({ ...progressInfo, percent, status: percent < 100 ? 'active' : 'success' });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadMethod = () => {
    setShouldSubmit(false);
    getBase64(uploadFile.fileList[0]).then((res) => {
      localUrlRef.current = res;
      uploadAttachment({ fileBinaryStream: res }, uploadProgressEvent).then((data) => {
        setUploading(false);
        setImgUrl(data.data.imageUrl);
        setShouldSubmit(true);
      }).catch((err) => {
        message.error('上传文件出错').then(() => {
        });
      });
    });
  };

  const checkFile = (file: RcFile | File): boolean => {
    if (fileTypeCases.filter((v) => file.type === v).length === 0) {
      message.error('请传入正确的格式文件').then(() => false);
    }
    return true;
  };

  const cropOkEvent = (file: File) => {
    // 这里的file是裁剪之后的file
    setUploadFile({ ...uploadFile, fileList: [file as RcFile] });
  };

  return (
    <Spin spinning={pending} tip="loading...">
      <Form initialValues={initData} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                disabled={uploading}
              >
                {uploadFile.fileBase64 || imgUrl ? <img src={uploadFile.fileBase64 || imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
    </Spin>
  );
};

export default EquipmentAddOrEdit;
