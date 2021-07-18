import React, { useState } from 'react'
import styles from './styles.module.scss'

import { FILTERS } from './constants'

interface IArtsSortProps {
  className?: string
  onChange?: (value: any) => void
}

const ArtsSort = ({ className, onChange }: IArtsSortProps) => {
  const [selectedValue, setSelectedValue] = useState(FILTERS[0].value)

  const handleChange = (event) => {
    const { value } = event.target
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.title}>Sort by</div>
      <div className={styles.separator}></div>
      {FILTERS.map(({ name, value }, idx) => (
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
            onChange={handleChange}
          />
          {name}
        </label>
      ))}
    </div>
  )
}

export default ArtsSort
