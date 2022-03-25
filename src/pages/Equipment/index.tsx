import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './style.module.scss';
import { ServicesApi } from '@/services/services-api';
import { CameraBrand } from '@/services/entities';
import CardItem from '@/pages/Equipment/components/CardItem';

const cx = classNames.bind(styles);

const { getCameraBrandsList } = ServicesApi;

const Equipment: React.FC = () => {
  const [allBrands, setAllBrands] = useState<CameraBrand[]>([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    getCameraBrandsList().then((res) => {
      setPageLoading(false);
      const { brands } = res.data;
      setAllBrands(brands);
    }).catch(() => {
      setPageLoading(false);
    });
  }, []);

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin spinning={pageLoading} indicator={loadingIcon()}>
      <div className={cx('main')}>
        {allBrands.map((item) => <CardItem key={item.brandId} item={item} />)}
      </div>
    </Spin>
  );
};

export default Equipment;
