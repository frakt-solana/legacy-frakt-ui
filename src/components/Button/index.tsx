import React from 'react'
import { ArrowRightIcon } from '../icons'
import styles from './Button.module.scss'

const Button = ({ className, onClick = () => {}, children }: any) => {
  return (
    <button
      type='button'
      className={`${styles.root} ${className || ''}`}
      onClick={onClick}
    >
      {children}
      <ArrowRightIcon className={styles.arrow} />
    </button>
  )
}

export default Button
