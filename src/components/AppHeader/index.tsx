import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'
import { ConnectButton } from '../_ConnectButton'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <div className={styles.rightPart}>
        <AppNavigation className={styles.navigation} />
        <ConnectButton />
      </div>
    </div>
  )
}

export default AppHeader
