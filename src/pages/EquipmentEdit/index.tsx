import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { ServicesApi } from '@/services/services-api';
import EquipmentAddOrEdit from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit';
import { BrandTypeProps } from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit/utils';

const cx = classNames.bind(styles);
const { getBrandInfo } = ServicesApi;

const EquipmentEdit: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandInfo, setBrandInfo] = useState<BrandTypeProps>();
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getBrandInfo({ brandId }).then((res) => {
      const { imageUrl, ...rest } = res.data.brandInfo;
      setImgUrl(imageUrl);
      setBrandInfo({ brandInfo: { ...rest } });
    })
      // TODO error event
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
  );
};

export default EquipmentEdit;
