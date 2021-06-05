import React from 'react'
import { ArrowRightIcon } from '../icons'
import styles from './Button.module.scss'

const Button = ({
  className,
  onClick = () => { },
  size = 'md',
  arrowLeft = false,
  showArrow = true,
  children,
}: any) => {
  return (
    <button
      type='button'
      className={`${styles.root} ${size === 'md' ? styles.md : size === 'sm' ? styles.sm : styles.lg
        } ${arrowLeft ? styles.arrowLeft : ''} ${className || ''}`}
      onClick={onClick}
    >
      {showArrow && arrowLeft && <ArrowRightIcon />}
      {children}
      {showArrow && !arrowLeft && <ArrowRightIcon />}
    </button>
  )
}

export default Button
