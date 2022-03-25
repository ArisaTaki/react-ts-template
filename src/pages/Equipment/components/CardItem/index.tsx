import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Card, Drawer } from 'antd';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { CameraBrand } from '@/services/entities';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);

interface CardProps {
  item: CameraBrand;
}

const { Meta } = Card;

const CardItem: React.FC<CardProps> = ({ item }: CardProps) => {
  const [showAllDescription, setShowAllDescription] = useState<boolean>(false);
  const history = useHistory();

  const {
    description, brand, imageUrl, brandId,
  } = item;

  const descriptionDom = ():React.ReactNode => (
    <div
      className={cx('description')}
      onClick={() => {
        setShowAllDescription(true);
      }}
    >
      {description}
    </div>

  );

  const goToEditPage = () => {
    history.push(routerPath.EquipmentEdit.replace(':brandId', brandId));
  };

  return (
    <Card
      className={cx('main')}
      cover={(
        <img
          className={cx('image')}
          alt="brandImage"
          src={imageUrl}
        />
            )}
      actions={[
        <div>
          <EditOutlined key="setting" />
          <span className={cx('item-choose')} onClick={goToEditPage}>编辑种类</span>
        </div>,
        <div>
          <UnorderedListOutlined key="ellipsis" />
          <span className={cx('item-choose')}>设备列表</span>
        </div>,
      ]}
    >
      <Meta
        title={brand}
        description={descriptionDom()}
      />
      <Drawer
        contentWrapperStyle={{ width: '85%' }}
        title="详细描述"
        placement="right"
        closable
        onClose={() => {
          setShowAllDescription(false);
        }}
        visible={showAllDescription}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <p>{description}</p>
      </Drawer>
    </Card>
  );
};

export default CardItem;
