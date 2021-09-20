import React from 'react'
import styles from './styles.module.scss'

import { SORTING, FILTERS } from './constants'
import { useWallet } from '../../contexts/wallet'

interface IArtsSortProps {
  className?: string
  sortValue: string
  onSortChange: (value: any) => void
  filterValue: string
  onFilterChangeValue: (value: any) => void
}

const ArtsFilter = ({
  className,
  sortValue,
  filterValue,
  onSortChange,
  onFilterChangeValue,
}: IArtsSortProps) => {
  const { connected, select } = useWallet()

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.inputWrapper}>
        <div className={styles.title}>Show</div>
        <div className={styles.separator}></div>
        {FILTERS.map(({ name, value }, idx) => (
          <label
            key={idx}
            className={`${styles.inputLabel} ${
              value === filterValue ? styles.inputLabelActive : ''
            }`}
            onClick={(event) => {
              if (!connected) {
                event.preventDefault()
                select()
              }
            }}
          >
            <input
              type='radio'
              value={value}
              name='sort'
              checked={value === filterValue}
              onChange={({ target }) => onFilterChangeValue(target.value)}
            />
            {name}
          </label>
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.title}>Sorted by</div>
        <div
          className={`${styles.separator} ${styles.separator__soring}`}
        ></div>
        {SORTING.map(({ name, value }, idx) => (
          <label
            key={idx}
            className={`${styles.inputLabel} ${
              value === sortValue ? styles.inputLabelActive : ''
            }`}
          >
            <input
              type='radio'
              value={value}
              name='sort'
              checked={value === sortValue}
              onChange={({ target }) => onSortChange(target.value)}
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  )
}

export default ArtsFilter
