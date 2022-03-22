import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { ServicesApi } from '@/services/services-api';
import { CameraBrand } from '@/services/entities';
import CardItem from '@/pages/Equipment/components/CardItem';

const cx = classNames.bind(styles);

const { getCameraBrandsList } = ServicesApi;

const Equipment: React.FC = () => {
  const [allBrands, setAllBrands] = useState<CameraBrand[]>([]);

  useEffect(() => {
    getCameraBrandsList().then((res) => {
      const { brands } = res.data;
      setAllBrands(brands);
    }).catch(() => {});
  }, []);
  return (
    <div className={cx('main')}>
      {allBrands.map((item) => <CardItem key={item.brandId} item={item} />)}
    </div>
  );
};

export default Equipment;
