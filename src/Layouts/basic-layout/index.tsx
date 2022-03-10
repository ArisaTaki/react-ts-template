import React, { useState } from 'react';
import className from 'classnames/bind';
import {
  Avatar, Dropdown, Layout, Menu,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, AntDesignOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { deleteUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';

const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;

export interface BasicLayoutProps {
  example?: string
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const history = useHistory();

  const menu = () => (
    <Menu>
      <Menu.Item key={1}>
        <div onClick={() => {
          deleteUser();
          history.replace(routerPath.Login);
        }}
        >
          退出登录
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className={cx('main')}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={cx('logo')} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx('site-layout-background', 'header')} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: cx('trigger'),
            onClick: () => { setCollapsed(!collapsed); },
          })}
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Avatar
              className={cx('avatar')}
              size={{
                xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100,
              }}
              icon={<AntDesignOutlined />}
            />
          </Dropdown>
        </Header>
        <Content
          className={cx('site-layout-background')}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
