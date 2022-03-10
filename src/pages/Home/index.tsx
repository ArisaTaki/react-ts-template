import React from 'react';
import className from 'classnames/bind';
import styles from './style.module.scss';
import BasicLayout from '@/components/Layout';

const cx = className.bind(styles);

const Home: React.FC = () => {
  console.log(1);
  return (
    <BasicLayout>
      <div>1</div>
    </BasicLayout>
  );
};

export default Home;
