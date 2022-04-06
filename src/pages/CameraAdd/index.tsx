import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import history from '@/utils/getHistory';
import { moveToSystemError404Page } from '@/helpers/history';
import CameraAddOrEdit from '@/pages/CameraList/components/CameraAddOrEdit';

const cx = classNames.bind(style);

const CameraAdd: React.FC = () => {
  const [brand, setBrand] = useState('');
  useEffect(() => {
    if (!history.location.state) {
      moveToSystemError404Page(true);
    } else {
      setBrand(history.location.state as string);
    }
  });
  return (
    brand ? <CameraAddOrEdit isEdit={false} brand={brand} /> : null
  );
};

export default CameraAdd;
