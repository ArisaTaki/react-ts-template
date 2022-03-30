import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import history from '@/utils/getHistory';
import { moveToSystemError404Page } from '@/helpers/history';
import CameraAddOrEdit from '@/pages/CameraList/components/CameraAddOrEdit';

const cx = classNames.bind(style);

const CameraEdit: React.FC = () => {
  useEffect(() => {
    if (!history.location.state) {
      moveToSystemError404Page(true);
    } else {
      console.log(history.location.state);
    }
  });
  return (
    <CameraAddOrEdit isEdit />
  );
};

export default CameraEdit;
