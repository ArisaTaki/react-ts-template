import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import {
  Avatar, Dropdown, Layout, Menu,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  AntDesignOutlined,
  HomeOutlined,
  VideoCameraAddOutlined, BarsOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { deleteUser, getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';

const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

export interface BasicLayoutProps {
  example?: string
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    console.log('获取用户信息');
  });

  const showUserMenu = () => (
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
      <Sider>
        <div className={cx('logo')} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
          <Menu.Item key={routerPath.Home} icon={<HomeOutlined />}>
            <Link to={routerPath.Home}>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BarsOutlined />} title="设备管理">
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              设备列表
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraAddOutlined />}>
              设备新增
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={routerPath.Question} icon={<QuestionCircleOutlined />}>
            <Link to={routerPath.Question}>疑问解答</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx('site-layout-background', 'header')} style={{ padding: 0 }}>
          <Dropdown overlay={showUserMenu} placement="bottomCenter" arrow>
            <Avatar
              className={cx('avatar')}
              icon={<AntDesignOutlined />}
            />
          </Dropdown>
          {}
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
