import React from 'react'
import styles from './AppLayout.module.scss'

export const AppLayout = (props: any) => {
  return (
    <div className={styles.main}>
      <div>Header here</div>
      <div>App Body here</div>
      <div>Footer here</div>
    </div>
  )
}
