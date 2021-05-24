import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <ul className={styles.menuList}>
        <li>Explore</li>
        <li>My FRACT'S</li>
        <li>BUTTON HERE</li>
      </ul>
    </div>
  )
}

export default AppHeader
