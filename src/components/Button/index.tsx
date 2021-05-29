import React from 'react'
import { ArrowRightIcon } from '../icons'
import styles from './Button.module.scss'

const Button = ({
  className,
  onClick = () => {},
  size = 'md',
  children,
}: any) => {
  return (
    <button
      type='button'
      className={`${styles.root} ${
        size === 'md' ? styles.md : size === 'sm' ? styles.sm : styles.lg
      } ${className || ''}`}
      onClick={onClick}
    >
      {children}
      <ArrowRightIcon />
    </button>
  )
}

export default Button
