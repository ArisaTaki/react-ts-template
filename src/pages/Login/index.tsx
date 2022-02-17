import React, { useEffect } from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import className from 'classnames/bind';
import styles from './style.module.scss';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/services-api';
import { saveUser } from '@/utils/storageUtils';

const cx = className.bind(styles);

const Login: React.FC = () => {
  const history = useHistory();

  const { login } = ServicesApi;

  const handleToHomePage = () => {
    login({ userName: '123', passWord: '123' }).then((res) => {
      console.log(res);
    }).catch(() => {});
  };
  const renderLoginForm = () => (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/#">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <div className={cx('buttons')}>
          <Button
            type="primary"
            className={cx('login')}
            onClick={handleToHomePage}
          >
            Log in
          </Button>
          <Button className={cx('register')} onClick={() => { history.push(routerPath.Register); }}>register now!</Button>
        </div>
      </Form.Item>
    </Form>
  );
  return (
    <div className={cx('content')}>
      <div className={cx('main')}>
        { renderLoginForm() }
      </div>
    </div>
  );
};

export default Login;
