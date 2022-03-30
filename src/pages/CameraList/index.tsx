import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import {
  Button, Modal, Spin, Table,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import styles from './styles.module.scss';
import { moveToSystemError404Page } from '@/helpers/history';
import { ServicesApi } from '@/services/services-api';
import { CameraInfo } from '@/services/entities';
import routerPath from '@/router/router-path';
import CameraAddOrEdit from '@/pages/CameraList/components/CameraAddOrEdit';

const cx = classNames.bind(styles);

const { getCameraList, delCameraList } = ServicesApi;

const CameraList: React.FC = () => {
  const [pageLoading, setLoading] = useState(false);
  const [cameraList, setCameraList] = useState<CameraInfo[]>([]);
  const [delConfirmFlag, setDelConfirmFlag] = useState(false);
  const [chooseArr, setChooseArr] = useState<CameraInfo[]>([]);
  const [chooseIndex, setChooseIndex] = useState<React.Key[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [operateFlag, setOperateFlag] = useState(false);
  const history = useHistory();

  const getCameraListMethod = () => {
    getCameraList({ brandId: history.location.state as string })
      .then((res) => {
        setLoading(false);
        setCameraList(res.data.cameraList);
      }).catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!history.location.state) {
      moveToSystemError404Page(true);
    } else {
      setLoading(true);
      getCameraListMethod();
    }
  }, []);

  const columns: ColumnsType<CameraInfo> = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
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
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text, item) => (
        <Button
          type="default"
          onClick={() => { showEditModal(item); }}
        >
          编辑
        </Button>
      ),
    },
  ];

  const showAddModal = () => {
    setOperateFlag(true);
    setIsEdit(false);
  };

  const showEditModal = (item: CameraInfo) => {
    setOperateFlag(true);
    setIsEdit(true);
  };

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: CameraInfo[]) => {
    setChooseArr(selectedRows);
    setChooseIndex(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    onChange: onSelectChange,
    selectedRowKeys: chooseIndex,
  };

  const getDelApiParams = (data: CameraInfo[]): Pick<CameraInfo, 'id'>[] => data.map((item) => {
    const { id, ...rest } = item;
    return { id };
  });

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const deleteItems = () => {
    setDelConfirmFlag(true);
  };

  const delEventOk = () => {
    setDelConfirmFlag(false);
    setLoading(true);
    delCameraList({ list: getDelApiParams(chooseArr) }).then((res) => {
      onSelectChange([], []);
      getCameraListMethod();
    }).catch((err) => {
      setDelConfirmFlag(false);
    });
  };

  return (
    <>
      <Modal
        title="确认删除"
        visible={delConfirmFlag}
        onCancel={() => setDelConfirmFlag(false)}
        onOk={delEventOk}
      >
        确定删除编号为
        {chooseIndex.sort((a, b) => Number(a) - Number(b)).join(',')}
        的设备吗？
      </Modal>
      <Modal
        visible={operateFlag}
        title={`设备${isEdit ? '编辑' : '新增'}`}
        onCancel={() => setOperateFlag(false)}
      >
        <CameraAddOrEdit isEdit={isEdit} />
      </Modal>
      <Spin spinning={pageLoading} indicator={loadingIcon()}>
        <div className={cx('buttons')}>
          <Button type="primary" onClick={showAddModal}>新增</Button>
          <Button
            type="default"
            danger
            className={cx('del')}
            disabled={!chooseArr.length}
            onClick={deleteItems}
          >
            删除
          </Button>
        </div>
        <Table columns={columns} dataSource={cameraList} rowKey="id" rowSelection={rowSelection} />
      </Spin>
    </>
  );
};

export default CameraList;
