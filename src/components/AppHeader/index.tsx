import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <ul className={styles.menuList}>
        <li>My Collection</li>
        <li>Explore</li>
        <li>Migration</li>
      </ul>
    </div>
  )
}

export default AppHeader
