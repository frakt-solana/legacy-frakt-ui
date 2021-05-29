import React, { useState } from 'react'
import styles from './ArtsSort.module.scss'

const filters = [
  {
    name: 'New',
    value: 'new',
  },
  {
    name: 'Rarity',
    value: 'rarity',
  },
]

const ArtsSort = ({ className }: any) => {
  const [selectedValue, setSelectedValue] = useState(filters[0].value)

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.title}>Sort by</div>
      <div className={styles.separator}></div>
      {filters.map(({ name, value }, idx) => (
        <label
          key={idx}
          className={`${styles.inputLabel} ${
            value === selectedValue ? styles.inputLabelActive : ''
          }`}
        >
          <input
            type='radio'
            value={value}
            name='sort'
            checked={value === selectedValue}
            onChange={(event) => setSelectedValue(event.target.value)}
          />{' '}
          {name}
        </label>
      ))}
    </div>
  )
}

export default ArtsSort
