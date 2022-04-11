import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Login: React.FC = () => (
  <div className={cx('content')}>
    login
  </div>
);

export default Login;
