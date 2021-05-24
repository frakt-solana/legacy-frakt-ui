import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <AppNavigation className={styles.navigation} />
    </div>
  )
}

export default AppHeader
