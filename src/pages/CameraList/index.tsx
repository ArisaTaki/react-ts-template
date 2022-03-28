import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import {
  Button, Modal, Spin, Switch, Table,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import styles from './styles.module.scss';
import { moveToSystemError404Page } from '@/helpers/history';
import { ServicesApi } from '@/services/services-api';
import { CameraInfo } from '@/services/entities';

const cx = classNames.bind(styles);

const { getCameraList } = ServicesApi;

const CameraList: React.FC = () => {
  const [pageLoading, setLoading] = useState(false);
  const [cameraList, setCameraList] = useState<CameraInfo[]>([]);
  const [delConfirmFlag, setDelConfirmFlag] = useState(false);
  const [delItemInfo, setDelItemInfo] = useState<CameraInfo>();
  const history = useHistory();
  useEffect(() => {
    if (!history.location.state) {
      moveToSystemError404Page(history, true);
    } else {
      setLoading(true);
      getCameraList({ brandId: history.location.state as string })
        .then((res) => {
          setLoading(false);
          setCameraList(res.data.cameraList);
        });
    }
  }, []);

  const columns: ColumnsType<CameraInfo> = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className={cx('number')}>{text}</span>,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '型号',
      dataIndex: 'modal',
      key: 'modal',
    },
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: '种类',
      key: 'type',
      dataIndex: 'type',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CameraInfo[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const delEvent = () => {
    console.log(delItemInfo);
  };

  return (
    <>
      <Modal
        title="确认删除"
        visible={delConfirmFlag}
        onCancel={() => setDelConfirmFlag(false)}
        onOk={delEvent}
      >
        是否确认删除该项？
      </Modal>
      <Spin spinning={pageLoading} indicator={loadingIcon()}>
        <Table columns={columns} dataSource={cameraList} rowKey="id" rowSelection={rowSelection} />
      </Spin>
    </>
  );
};

export default CameraList;
