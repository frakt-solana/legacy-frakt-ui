import React from 'react'
import styles from './AppHeader.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'
// import { ConnectButton } from '../_ConnectButton'
import Button from '../Button'

const AppHeader = (props: any) => {
  return (
    <div className={styles.root}>
      <CompanyLogo />
      <div className={styles.rightPart}>
        <AppNavigation />
        <Button className={styles.connectButton} onClick={() => alert("Modal here")}>Connect wallet</Button>
        {/* <ConnectButton /> */}
      </div>
    </div>
  )
}

export default AppHeader
