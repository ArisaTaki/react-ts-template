import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Card, Drawer } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { CameraBrand } from '@/services/entities';

const cx = classNames.bind(styles);

interface CardProps {
  item: CameraBrand;
}

const { Meta } = Card;

const CardItem: React.FC<CardProps> = ({ item }: CardProps) => {
  const [showAllDescription, setShowAllDescription] = useState<boolean>(false);

  const { description, brand, imageUrl } = item;

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
        <PlusOutlined key="setting" />,
        <UnorderedListOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={brand}
        description={descriptionDom()}
      />
      <Drawer
        contentWrapperStyle={{ width: 280 }}
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
