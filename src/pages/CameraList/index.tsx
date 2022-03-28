import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { moveToSystemError404Page } from '@/helpers/history';

const cx = classNames.bind(styles);

const CameraList: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    if (!history.location.state) {
      moveToSystemError404Page(history, true);
    }
  }, []);
  return (
    <div>
      <div>1</div>
    </div>
  );
};

export default CameraList;
