import React from 'react';
import className from 'classnames/bind';
import styles from './style.module.scss';
import BasicLayout from '@/Layouts/basic-layout';

const cx = className.bind(styles);

const Home: React.FC = () => {
  console.log(1);
  return (
    <BasicLayout>
      <div>test</div>
    </BasicLayout>
  );
};

export default Home;
