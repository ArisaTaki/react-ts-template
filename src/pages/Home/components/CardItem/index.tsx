import React from 'react';
import classNames from 'classnames/bind';
import { Card } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { CameraBrand } from '@/services/entities';

const cx = classNames.bind(styles);

interface CardProps {
  item: CameraBrand;
}

const { Meta } = Card;

const CardItem: React.FC<CardProps> = ({ item }: CardProps) => {
  const { description, brand, imageUrl } = item;
  return (
    <Card
      className={cx('main')}
      cover={(
        <img
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
        description={description}
      />
    </Card>
  );
};

export default CardItem;
