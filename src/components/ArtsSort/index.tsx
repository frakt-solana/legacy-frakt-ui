import React, { useState } from 'react'
import styles from './ArtsSort.module.scss'

const filters = [
  {
    name: 'New',
    value: 'created_at',
  },
  {
    name: 'Rarity',
    value: 'rarity',
  },
]

const ArtsSort = ({ className, onChange }: any) => {

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    onChange(value);
  }

  const [selectedValue, setSelectedValue] = useState(filters[0].value)

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.title}>Sort by</div>
      <div className={styles.separator}></div>
      {filters.map(({ name, value }, idx) => (
        <label
          key={idx}
          className={`${styles.inputLabel} ${value === selectedValue ? styles.inputLabelActive : ''
            }`}
        >
          <input
            type='radio'
            value={value}
            name='sort'
            checked={value === selectedValue}
            onChange={handleChange}
          />{' '}
          {name}
        </label>
      ))}
    </div>
  )
}

export default ArtsSort
