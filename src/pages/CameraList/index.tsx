import React, { ChangeEventHandler, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button, Input, Modal, PageHeader, Spin, Table, Tag,
} from 'antd';
import { DeleteFilled, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import {
  SorterResult, TableAction, TablePaginationConfig, TableRowSelection,
} from 'antd/lib/table/interface';
import history from '@/utils/getHistory';
import styles from './styles.module.scss';
import { moveToSystemError404Page } from '@/helpers/history';
import { ServicesApi } from '@/services/services-api';
import { CameraInfo, SearchCondition } from '@/services/entities';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);

const { searchCameras, delCameraList } = ServicesApi;

interface PaginationProps {
  pageSize: number,
  current: number,
  total?: number,
}

const SearchInfoMap: Record<string, string> = {
  brand: '品牌',
  location: '设备安装位置',
  modal: '设备型号',
  title: '视频标题',
  type: '镜头分类',
};

const SearchTagsStyles: Record<string, { color: string, close: boolean }> = {
  brand: {
    color: 'cyan',
    close: false,
  },
  location: {
    color: 'orange',
    close: true,
  },
  modal: {
    color: 'green',
    close: true,
  },
  title: {
    color: 'blue',
    close: true,
  },
  type: {
    color: 'purple',
    close: true,
  },
};

const initSearchInfo = {
  brand: '',
  type: '',
  title: '',
  location: '',
  modal: '',
};

const CameraList: React.FC = () => {
  const [pageLoading, setLoading] = useState(false);
  const [cameraList, setCameraList] = useState<CameraInfo[]>([]);
  const [delConfirmFlag, setDelConfirmFlag] = useState(false);
  const [chooseArr, setChooseArr] = useState<CameraInfo[]>([]);
  const [chooseIndex, setChooseIndex] = useState<React.Key[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationProps>();
  const [sorterOrder, setSortOrder] = useState<string | undefined>();
  const [searchInfo, setSearchInfo] = useState<SearchCondition>(initSearchInfo);
  const [tagList, setTagList] = useState<SearchCondition>(initSearchInfo);
  const [searchPartFlag, setSearchPartFlag] = useState(false);
  // bad code
  const [brandName] = useState<string>(history.location.state as string);

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
      setSearchInfo({ ...searchInfo, brand: brandName });
      setTagList({ ...tagList, brand: brandName });
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

  const paginationChangeEvent = (page: number, pageSize: number, sort?: string) => {
    setLoading(true);
    setCameraList([]);
    searchCameras({
      query:
              {
                size: pageSize, index: page, condition: searchInfo, sort,
              },
    })
      .then((res) => {
        setLoading(false);
        setPaginationData({ ...paginationData, current: page, pageSize });
        setCameraList(res.data.records);
      }).catch((err) => {
        // TODO
      });
  };

  const sorterChangeEvent = (sort?: string) => {
    searchCameras({
      query:
          {
            sort: sort!,
            size: paginationData?.pageSize,
            index: paginationData?.current,
            condition: searchInfo,
          },
    })
      .then((res) => {
        setLoading(false);
        setCameraList(res.data.records);
      }).catch((err) => {
      // TODO
      });
  };

  const switchActionChange = (action: TableAction,
    sort:SorterResult<CameraInfo>,
    pagination:TablePaginationConfig) => {
    if (action === 'sort') {
      setLoading(true);
      setSortOrder(sort.order ?? undefined);
      sorterChangeEvent(sort.order ?? undefined);
    }
    if (action === 'paginate') {
      paginationChangeEvent(pagination.current ?? 1,
        pagination.pageSize ?? 10, sort.order ?? undefined);
    }
  };

  const switchInputValue = (key: string, val: string) => {
    switch (key) {
      case 'location':
        setSearchInfo({ ...searchInfo, location: val });
        break;
      case 'modal':
        setSearchInfo({ ...searchInfo, modal: val });
        break;
      case 'title':
        setSearchInfo({ ...searchInfo, title: val });
        break;
      case 'type':
        setSearchInfo({ ...searchInfo, type: val });
        break;
      default:
    }
  };

  const openSearchPart = () => {
    setSearchPartFlag(true);
  };

  const getSearchRes = () => {
    setLoading(true);
    searchCameras({
      query: {
        condition: searchInfo,
        size: paginationData?.pageSize,
        index: paginationData?.current,
        sort: sorterOrder,
      },
    }).then((res) => {
      setLoading(false);
      setTagList(searchInfo);
      setSearchPartFlag(false);
      setCameraList(res.data.records);
    }).catch((err) => {});
  };

  const renderSearchPart = () => (
    <div className={cx('search-part')}>
      {Object.keys(searchInfo).map((item, index) => {
        if (item === 'brand') {
          return;
        }
        return (
          <Input
            placeholder={SearchInfoMap[item]}
            value={searchInfo[`${item}`]}
            className={cx(`search-${item}`)}
            onChange={(e) => switchInputValue(item, e.target.value)}
            key={index}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <div className={cx('header')}>
        <PageHeader
          onBack={() => { history.goBack(); }}
          className={cx('page-header')}
          title="设备列表"
        />
        <div className={cx('tags')}>
          {Object.keys(tagList).map((item, index) => {
            if (tagList[item]) {
              return (
                <Tag
                  className={cx(SearchTagsStyles[item].color)}
                  key={index}
                  color={SearchTagsStyles[item].color}
                  closable={SearchTagsStyles[item].close}
                  onClose={() => { switchInputValue(item, ''); }}
                >
                  {searchInfo[item]}
                </Tag>
              );
            }
            return null;
          })}
        </div>
      </div>
      <Modal
        title="筛选条件"
        visible={searchPartFlag}
        onCancel={() => {
          setSearchPartFlag(false);
        }}
        onOk={getSearchRes}
        maskClosable={false}
      >
        {renderSearchPart()}
      </Modal>
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
          <div className={cx('btns')}>
            <Button
              className={cx('search-btn')}
              type="primary"
              icon={<SearchOutlined />}
              onClick={openSearchPart}
            >
              查询
            </Button>
            <Button
              type="default"
              icon={<DeleteFilled />}
              onClick={() => {
                setSearchInfo({ ...initSearchInfo, brand: brandName });
                setTagList({ ...initSearchInfo, brand: brandName });
                setChooseArr([]);
                setChooseIndex([]);
              }}
            >
              重置
            </Button>
          </div>
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
          scroll={{ y: 433 }}
          columns={columns}
          dataSource={cameraList}
          rowKey="id"
          rowSelection={rowSelection}
          onChange={(pagination, filters, sorter, extra) => {
            sorter = sorter as SorterResult<CameraInfo>;
            switchActionChange(extra.action, sorter, pagination);
          }}
          showSorterTooltip={false}
          pagination={{
            ...paginationProps,
          }}
        />
      </Spin>
    </>
  );
};

export default CameraList;
