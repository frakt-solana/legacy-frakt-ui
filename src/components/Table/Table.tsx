import React from 'react';

import styles from './styles.module.scss';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';

interface TableProps {
  header?: Array<any>; //? failed to describe the interface. Swears at the type of number
  data: Array<any>;
  size?: string;
  className?: string;
}

//? header and data items are [name: string | Object, value: string | Object] pairs
//? name can be string or Object with shape: { text: string, tooltipText?: string }
//? value can be string or Object with shape: { text: string, linkTo?: string }

const Table = ({
  className = '',
  size = 'md',
  header,
  data = [],
}: TableProps): JSX.Element => {
  return (
    <div className={`${styles.root} ${styles[size]} ${className}`}>
      {header && <TableHeader name={header[0]} value={header[1]} />}

      {data.map(([name, value], idx) => (
        <TableRow key={idx} name={name} value={value} />
      ))}
    </div>
  );
};

export default Table;
