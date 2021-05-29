import React from 'react'
import styles from './AppLayout.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'
import { ConnectButton } from '../ConnectButton'
import AppFooter from '../AppFooter'

const AppLayout = ({
  CustomHeader,
  headerText = '',
  children,
  className,
}: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      <Sidebar>
        <div className={styles.logoWrapper}>
          <CompanyLogo />
        </div>
        <div className={styles.profileWrapper}>
          <ConnectButton />
        </div>
        <div className={styles.navigationWrapper}>
          <AppNavigation />
          <AppFooter className={styles.footer} />
        </div>
      </Sidebar>
      <Main>
        {CustomHeader && <CustomHeader />}
        {headerText && <Header>{headerText}</Header>}
        {children}
      </Main>
    </div>
  )
}

export default AppLayout

const Sidebar = ({ children, className }: any) => {
  return (
    <div className={`${styles.sideBar} ${className || ''}`}>{children}</div>
  )
}

const Main = ({ children, className }: any) => {
  return <div className={`${styles.main} ${className || ''}`}>{children}</div>
}

const Header = ({ children, className }: any) => {
  return <div className={`${styles.header} ${className || ''}`}>{children}</div>
}
