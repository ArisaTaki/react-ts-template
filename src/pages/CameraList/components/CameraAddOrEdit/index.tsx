import React from 'react';
import classNames from 'classnames/bind';
import {
  Button, Form, Input, PageHeader,
} from 'antd';
import styles from './style.module.scss';
import history from '@/utils/getHistory';
import { CameraInfo } from '@/services/entities';

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

const CameraAddOrEdit: React.FC<CameraAddOrEditProps> = ({ isEdit, brand, initData }) => {
  const initAddData: CameraInfo = {
    brand: brand!,
    description: '',
    modal: '',
    title: '',
    type: '',
    location: '',
  };
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <PageHeader
        onBack={() => { history.goBack(); }}
        className={cx('header')}
        title={`设备${isEdit ? '编辑' : '新增'}`}
      />
      <Form {...layout} initialValues={isEdit ? initData : initAddData} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="brand" label="品牌" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="位置" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="modal" label="型号" rules={[{ type: 'number', min: 0, max: 99 }]}>
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
    </>
  );
};

export default CameraAddOrEdit;
