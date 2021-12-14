import React from 'react';
import styles from './styles.module.scss';

import { SORTING, FILTERS } from './constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '../../contexts/walletModal';

interface ArtsSortProps {
  hideFilter?: boolean;
  className?: string;
  sortValue: string;
  onSortChange: (value: any) => void;
  filterValue: string;
  onFilterChangeValue: (value: any) => void;
}

const ArtsFilter = ({
  hideFilter,
  className,
  sortValue,
  filterValue,
  onSortChange,
  onFilterChangeValue,
}: ArtsSortProps): JSX.Element => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <div className={`${styles.root} ${className || ''}`}>
      {!hideFilter && (
        <div className={styles.inputWrapper}>
          <div className={styles.title}>Show</div>
          <div className={styles.separator} />
          {FILTERS.map(({ name, value }, idx) => (
            <label
              key={idx}
              className={`${styles.inputLabel} ${
                value === filterValue ? styles.inputLabelActive : ''
              }`}
              onClick={(event): void => {
                if (!connected) {
                  event.preventDefault();
                  setVisible(false);
                }
              }}
            >
              <input
                type="radio"
                value={value}
                name="sort"
                checked={value === filterValue}
                onChange={({ target }): void =>
                  onFilterChangeValue(target.value)
                }
              />
              {name}
            </label>
          ))}
        </div>
      )}
      <div className={styles.inputWrapper}>
        <div className={styles.title}>Sorted by</div>
        <div className={`${styles.separator} ${styles.separator__soring}`} />
        {SORTING.map(({ name, value }, idx) => (
          <label
            key={idx}
            className={`${styles.inputLabel} ${
              value === sortValue ? styles.inputLabelActive : ''
            }`}
          >
            <input
              type="radio"
              value={value}
              name="sort"
              checked={value === sortValue}
              onChange={({ target }): void => onSortChange(target.value)}
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ArtsFilter;
