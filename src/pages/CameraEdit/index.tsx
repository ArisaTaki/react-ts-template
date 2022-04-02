import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import history from '@/utils/getHistory';
import { moveToSystemError404Page } from '@/helpers/history';
import CameraAddOrEdit from '@/pages/CameraList/components/CameraAddOrEdit';
import { ServicesApi } from '@/services/services-api';
import { CameraInfo } from '@/services/entities';

const cx = classNames.bind(style);

const { getCameraInfo } = ServicesApi;
const CameraEdit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cameraInfo, setCameraInfo] = useState<CameraInfo>();

  useEffect(() => {
    setLoading(true);
    if (!history.location.state) {
      setLoading(false);
      moveToSystemError404Page(true);
    } else {
      const id = history.location.state as string;
      console.log(id);
      getCameraInfo({ id }).then((res) => {
        setLoading(false);
        console.log(res);
      }).catch((err) => {
        setLoading(false);
      });
    }
  }, [history]);

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Spin indicator={loadingIcon()} spinning={loading}>
      <CameraAddOrEdit isEdit initData={cameraInfo} />
    </Spin>
  );
};

export default CameraEdit;
