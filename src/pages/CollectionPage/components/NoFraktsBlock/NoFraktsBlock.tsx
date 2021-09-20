import React from 'react'

import styles from './styles.module.scss'

const NoFraktsBlock = () => {
  return (
    <div className={styles.root}>
      <p className={styles.message}>
        Unfortunately, you don't have any frakts yet
      </p>
    </div>
  )
}

export default NoFraktsBlock
