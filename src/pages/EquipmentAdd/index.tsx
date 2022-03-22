import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import { getBase64 } from '@/utils/fileUtils';
import routerPath from '@/router/router-path';
import EquipmentAddOrEdit from '@/components/EquipmentAddOrEdit';
import { BrandTypeProps, IUploadType, UploadProgressConfig } from '@/components/EquipmentAddOrEdit/utils';

const cx = classNames.bind(styles);

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

  const onFinish = (values: BrandTypeProps) => {
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

  return (
    <>
      <div>种类添加</div>
      <EquipmentAddOrEdit
        checkFile={checkFile}
        uploading={uploading}
        uploadFile={uploadFile}
        cropOkEvent={cropOkEvent}
        progressInfo={progressInfo}
        imgUrl={imgUrl}
        shouldSubmit={shouldSubmit}
        uploadMethod={uploadMethod}
      />
    </>
  );
};

export default EquipmentAdd;
