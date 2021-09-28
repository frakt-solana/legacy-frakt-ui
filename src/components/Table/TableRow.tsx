import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const TooltipIcon = ({ text }): JSX.Element => (
  <Tooltip color={'#1e1e1e'} title={text}>
    <QuestionCircleOutlined className={styles.questionIcon} />
  </Tooltip>
);

export const TableRow = ({ name, value }): JSX.Element => (
  <div className={styles.row}>
    {typeof name === 'string' ? (
      <p>{name}</p>
    ) : (
      <p>
        {name.text} <TooltipIcon text={name.tooltipText} />
      </p>
    )}

    {typeof value === 'string' ? (
      <p>{value}</p>
    ) : (
      <Link to={value.linkTo} className={styles.link}>
        {value.text}
      </Link>
    )}
  </div>
);
