import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import EquipmentAddOrEdit from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit';
import { BrandTypeProps } from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit/utils';
import CardItem from '@/pages/Equipment/components/CardItem';

const cx = classNames.bind(styles);
const { getBrandInfo } = ServicesApi;

const EquipmentEdit: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandInfo, setBrandInfo] = useState<BrandTypeProps>();
  const [imgUrl, setImgUrl] = useState('');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    getBrandInfo({ brandId }).then((res) => {
      setPageLoading(false);
      const { imageUrl, ...rest } = res.data.brandInfo;
      setImgUrl(imageUrl);
      setBrandInfo({ brandInfo: { ...rest } });
    })
      // TODO error event
      .catch((err) => {
        setPageLoading(false);
        console.log(err);
      });
  }, []);

  const loadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Spin spinning={pageLoading} indicator={loadingIcon()}>
      <>
        <div>种类编辑</div>
        {brandInfo ? (
          <EquipmentAddOrEdit
            initData={brandInfo}
            apiImgUrl={imgUrl}
            isEdit
            brandId={brandId}
          />
        ) : null}
      </>
    </Spin>
  );
};

export default EquipmentEdit;
