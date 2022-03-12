import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import {
  Avatar, Dropdown, Layout, Menu,
} from 'antd';
import {
  VideoCameraOutlined,
  AntDesignOutlined,
  HomeOutlined,
  VideoCameraAddOutlined,
  BarsOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  deleteUser, deleteUserInfo, getUserInfoStore,
} from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import { UserInfo } from '@/services/entities';

const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

export interface BasicLayoutProps {
  example?: string
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setUserInfo(getUserInfoStore());
  }, []);

  const showUserMenu = () => (
    <Menu>
      <Menu.Item key="1">
        <div onClick={() => {}}>
          {userInfo?.name}
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={() => {
          deleteUserInfo();
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
      <Sider trigger={null} collapsible collapsed={collapsed} className={cx('aside')}>
        <div className={cx('logo', { large: !collapsed })} />
        <Menu theme="light" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
          <Menu.Item key={routerPath.Home} icon={<HomeOutlined />}>
            <Link to={routerPath.Home}>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BarsOutlined />} title="设备管理">
            <Menu.Item key={routerPath.Equipment} icon={<VideoCameraOutlined />}>
              <Link to={routerPath.Equipment}>种类列表</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraAddOutlined />}>
              <Link to={routerPath.EquipmentAdd}>种类新增</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={routerPath.Question} icon={<QuestionCircleOutlined />}>
            <Link to={routerPath.Question}>疑问解答</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx('site-layout-background', 'header')} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: cx('trigger'),
            onClick: () => { setCollapsed(!collapsed); },
          })}
          <div className={cx('avatar')}>
            <Dropdown overlay={showUserMenu} placement="bottomCenter" arrow>
              <Avatar
                className={cx('avatar-img')}
                icon={<AntDesignOutlined />}
              />
            </Dropdown>
            <div className={cx('user-info')}>
              <div className={cx('company')}>{userInfo?.companyName}</div>
              <div className={cx('name')}>{userInfo?.name}</div>
            </div>
          </div>
        </Header>
        <Content
          className={cx('site-layout-background')}
          style={{
            margin: '24px 16px',
            padding: '24px 24px 14px 24px',
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
