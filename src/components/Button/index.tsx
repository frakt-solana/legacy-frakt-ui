import React from 'react'
import styles from './Button.module.scss'

const Button = ({ className, onClick = () => {}, children }: any) => {
  return (
    <button
      type='button'
      className={`${styles.root} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
