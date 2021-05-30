import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'
import { ConnectButton } from '../ConnectButton'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <div className={styles.rightPart}>
        <AppNavigation />
        <ConnectButton className={styles.connectButton} />
      </div>
    </div>
  )
}

export default AppHeader
