import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import BasicLayout from '@/Layouts/basic-layout';

const cx = classNames.bind(styles);

const Question: React.FC = () => (
  <BasicLayout>
    <div>question</div>
  </BasicLayout>
);

export default Question;
