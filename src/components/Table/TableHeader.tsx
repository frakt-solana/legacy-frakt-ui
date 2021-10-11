import React from 'react';

import styles from './styles.module.scss';

export const TableHeader = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): JSX.Element => {
  return (
    <div className={styles.header}>
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
};
