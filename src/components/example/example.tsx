import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

export interface ExampleProps {
  example: string
}

const Example: React.FC<ExampleProps> = (props: ExampleProps) => {
  const { example } = props;
  return (
    <div className={cx('example-style')}>{example}</div>
  );
};

export default Example;
