import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import BasicLayout from '@/Layouts/basic-layout';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  console.log();
  return (
    <BasicLayout>
      <div>test</div>
    </BasicLayout>
  );
};

export default Home;
