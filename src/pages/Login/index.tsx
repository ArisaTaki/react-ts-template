import React, { createRef } from 'react';
import {
  Button, Form, Input,
  FormInstance, message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/services-api';
import { saveUser, saveUserInfo } from '@/utils/storageUtils';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const history = useHistory();

  const { login, getUserInfo } = ServicesApi;
  const [form] = Form.useForm();
  const formRef = createRef<FormInstance>();

  const handleToHomePage = async () => {
    try {
      const { userName, passWord } = form.getFieldsValue();
      const checkResult = await formRef.current?.validateFields();
      login({ userName, passWord }).then((res) => {
        const { data } = res;
        saveUser(data);
        getUserInfo().then((user) => {
          saveUserInfo(user.data);
          message.success(`欢迎你，${user.data.name}`);
          history.push(routerPath.Home);
        }).catch(() => {});
      }).catch((err) => {
        // TODO login error events
        message.error('something going wrong');
        console.log(err);
      });
    } catch (err) {
      message.warning('账号和密码不能为空');
    }
  };
  const renderLoginForm = () => (
    <Form
      ref={formRef}
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="userName"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="passWord"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <div className={cx('buttons')}>
          <Button
            type="primary"
            className={cx('login')}
            onClick={handleToHomePage}
          >
            登录
          </Button>
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
