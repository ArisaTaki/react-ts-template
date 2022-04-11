import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.scss';

const cx = className.bind(styles);

export interface BasicLayoutProps {
  example?: string
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  useEffect(() => {
  }, []);

  return (
    <div>这是layout组件，详细使用请移步router文件夹说明</div>
  );
};

export default BasicLayout;
