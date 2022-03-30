import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface CameraAddOrEditProps {
  isEdit: boolean
}

const CameraAddOrEdit: React.FC<CameraAddOrEditProps> = ({ isEdit }) => {
  console.log(isEdit);
  return (
    <div className={cx('syt')}>{isEdit ? '变更' : '新增'}</div>
  );
};

export default CameraAddOrEdit;
