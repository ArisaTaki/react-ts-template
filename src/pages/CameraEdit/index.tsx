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
    if (!history.location.state) {
      moveToSystemError404Page(true);
    } else {
      setLoading(true);
      const id = history.location.state as string;
      getCameraInfo({ id }).then((res) => {
        setLoading(false);
        setCameraInfo(res.data.cameraInfo);
      }).catch((err) => {
        setLoading(false);
      });
    }
  }, [history]);

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Spin indicator={loadingIcon()} spinning={loading}>
      {cameraInfo ? <CameraAddOrEdit isEdit initData={cameraInfo} /> : null}
    </Spin>
  );
};

export default CameraEdit;
