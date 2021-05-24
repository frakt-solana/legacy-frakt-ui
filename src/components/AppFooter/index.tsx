import React from 'react'
import styles from './AppFooter.module.scss'

const AppFooter = (props: any) => {
  return (
    <div className={styles.root}>
      <ul className={styles.hashtags}>
        <li>#HashTag1</li>
        <li>#HashTag2</li>
        <li>#HashTag3</li>
      </ul>
      <ul className={styles.icons}>
        <li>icon1</li>
        <li>icon2</li>
        <li>icon3</li>
      </ul>
    </div>
  )
}

export default AppFooter
