import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button, Modal, Pagination, Spin, Table,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { PaginationConfig } from 'antd/es/pagination';
import history from '@/utils/getHistory';
import styles from './styles.module.scss';
import { moveToSystemError404Page } from '@/helpers/history';
import { ServicesApi } from '@/services/services-api';
import { CameraInfo } from '@/services/entities';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);

const { searchCameras, delCameraList } = ServicesApi;

interface PaginationProps {
  pageSize: number,
  current: number,
  total?: number,
}

const CameraList: React.FC = () => {
  const [pageLoading, setLoading] = useState(false);
  const [cameraList, setCameraList] = useState<CameraInfo[]>([]);
  const [delConfirmFlag, setDelConfirmFlag] = useState(false);
  const [chooseArr, setChooseArr] = useState<CameraInfo[]>([]);
  const [chooseIndex, setChooseIndex] = useState<React.Key[]>([]);
  // bad code
  const [brandName] = useState<string>(history.location.state as string);
  const [paginationData, setPaginationData] = useState<PaginationProps>();

  const getCameraListMethod = () => {
    searchCameras({ query: { condition: { brand: brandName }, index: 1, size: 10 } })
      .then((res) => {
        setLoading(false);
        setCameraList(res.data.records);
        setPaginationData({
          pageSize: res.data.size,
          current: res.data.index,
          total: res.data.total,
        });
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
      title: '设备编号',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
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
          onClick={() => {
            history.push(routerPath.CameraEdit, item.id);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: () => `共${paginationData?.total}条`,
    pageSize: paginationData?.pageSize,
    current: paginationData?.current,
    total: paginationData?.total,
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
      <Spin spinning={pageLoading} indicator={loadingIcon()}>
        <div className={cx('buttons')}>
          <Button
            type="primary"
            onClick={() => {
              history.push(routerPath.CameraAdd, brandName);
            }}
          >
            新增
          </Button>
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
        <Table
          scroll={{ y: 485 }}
          columns={columns}
          dataSource={cameraList}
          rowKey="id"
          rowSelection={rowSelection}
          onChange={(pagination, filters, sorter, extra) => {
            if (extra.action === 'sort') {
              console.log(2);
            }
          }}
          pagination={{
            ...paginationProps,
            onChange: (page: number, pageSize: number) => {
              setLoading(true);
              setCameraList([]);
              searchCameras({
                query:
                    { size: pageSize, index: page, condition: { brand: brandName } },
              })
                .then((res) => {
                  setLoading(false);
                  setPaginationData({ ...paginationData, current: page, pageSize });
                  setCameraList(res.data.records);
                });
            },
          }}
        />
      </Spin>
    </>
  );
};

export default CameraList;
