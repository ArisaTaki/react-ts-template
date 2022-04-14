import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button, Form, Input, message, PageHeader, Spin,
} from 'antd';
import styles from './style.module.scss';
import history from '@/utils/getHistory';
import { CameraInfo } from '@/services/entities';
import { ServicesApi } from '@/services/services-api';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);

interface CameraAddOrEditProps {
  isEdit: boolean
  initData?: CameraInfo
  brand? :string
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const { updateCameraInfo, addCameraInfo } = ServicesApi;

const CameraAddOrEdit: React.FC<CameraAddOrEditProps> = ({ isEdit, brand, initData }) => {
  const [pending, setPending] = useState(false);

  const initAddData: CameraInfo = {
    brand: brand!,
    description: '',
    modal: '',
    title: '',
    type: '',
    location: '',
  };

  const goToListPage = () => {
    message.success(isEdit ? '修改成功' : '添加成功');
    history.goBack();
  };

  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values: any) => {
    setPending(true);
    if (isEdit) {
      updateCameraInfo({ cameraInfo: values }).then((res) => {
        setPending(false);
        goToListPage();
      }).catch((err) => {
      // TODO
      });
    } else {
      addCameraInfo({ cameraInfo: values }).then((res) => {
        setPending(false);
        goToListPage();
      }).catch((err) => {
      // TODO
      });
    }
  };

  return (
    <Spin spinning={pending} tip="loading...">
      <PageHeader
        onBack={() => { history.goBack(); }}
        className={cx('header')}
        title={`设备${isEdit ? '编辑' : '新增'}`}
      />
      <Form {...layout} initialValues={isEdit ? initData : initAddData} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="brand" label="品牌" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="location" label="位置">
          <Input />
        </Form.Item>
        <Form.Item name="modal" label="型号">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="标题">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="种类">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="备注">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CameraAddOrEdit;
