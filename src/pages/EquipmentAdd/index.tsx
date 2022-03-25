import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import EquipmentAddOrEdit from '@/pages/EquipmentAdd/components/EquipmentAddOrEdit';

const cx = classNames.bind(styles);

const EquipmentAdd: React.FC = () => (
  <>
    <div>种类添加</div>
    <EquipmentAddOrEdit isEdit={false} />
  </>
);

export default EquipmentAdd;
