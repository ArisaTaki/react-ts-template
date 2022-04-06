import React from 'react';
import classNames from 'classnames/bind';
import { Button, Result } from 'antd';
import history from '@/utils/getHistory';
import styles from './styles.module.scss';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);

const NoAuth: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={() => history.replace(routerPath.Home)}>Back Home</Button>}
  />
);

export default NoAuth;
