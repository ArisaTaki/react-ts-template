import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const NotFind: React.FC = () => {
  useEffect(() => {
    console.log('1');
  });
  return (
    <div>
      <p>404</p>
    </div>
  );
};

export default NotFind;
