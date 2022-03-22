import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import {
  Form, Input, Upload, Button, message, Progress,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import { getBase64 } from '@/utils/fileUtils';
import routerPath from '@/router/router-path';

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

interface AddBrandType {
  brandInfo: {
    brand: string
    description: string
  }
}

const { uploadAttachment, addBrand } = ServicesApi;

const EquipmentAdd: React.FC = () => {
  const fileTypeCases = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  const [uploadFile, setUploadFile] = useState<IUploadType>({
    fileList: [],
    fileBase64: '',
  });
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const localUrlRef = useRef<string>('');
  const [progressInfo, setProgressInfo] = useState<UploadProgressConfig>({ status: 'active', percent: 0 });
  const [imgUrl, setImgUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const history = useHistory();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label}不可为空',
  };

  const uploadProgressEvent = (e: ProgressEvent) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    if (percent >= 100) {
      setUploadFile({ ...uploadFile, fileBase64: localUrlRef.current });
    }
    setUploading(true);
    setProgressInfo({ ...progressInfo, percent, status: percent < 100 ? 'active' : 'success' });
  };

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

  const onFinish = (values: AddBrandType) => {
    const { brand, description } = values.brandInfo;
    addBrand({ description, brand, imgUrl }).then((res) => {
      message.success('添加成功');
      history.push(routerPath.Equipment);
    }).catch((err) => {});
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

  // getValueFromEvent 是获取到Form.Item 绑定到的数据的值
  // 但是Form.Item 触发时机比进行图片处理要早，所以不适用Form自带的数据处理
  return (
    <>
      <div>种类添加</div>
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
    </>
  );
};

export default EquipmentAdd;
