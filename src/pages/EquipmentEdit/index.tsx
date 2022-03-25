import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';

const cx = classNames.bind(styles);
const { getBrandInfo } = ServicesApi;

const EquipmentEdit: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();

  useEffect(() => {
    getBrandInfo({ brandId }).then((res) => {
      console.log(res);
    });
  });
  return <div>{brandId}</div>;
};

export default EquipmentEdit;
