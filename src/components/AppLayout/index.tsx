import React, { useEffect } from 'react'
import styles from './AppLayout.module.scss'

import CompanyLogo from '../CompanyLogo'
import AppNavigation from '../AppNavigation'
import { ConnectButton } from '../ConnectButton'
import AppFooter from '../AppFooter'
import CurrentUserTable from '../CurrentUserTable'
import { useWallet } from '../../contexts/wallet'
import WalletContent from '../WalletContent'
import { useLocation } from 'react-router-dom'

const AppLayout = ({
  CustomHeader,
  headerText = '',
  children,
  className,
}: any) => {
  const { connected, isModalVisible, closeModal } = useWallet()
  const location = useLocation()

  useEffect(() => {
    isModalVisible && closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <Sidebar>
        <div className={styles.logoWrapper}>
          <CompanyLogo />
        </div>
        <div className={styles.profileWrapper}>
          {connected ? (
            <CurrentUserTable />
          ) : isModalVisible ? null : (
            <ConnectButton />
          )}
        </div>
        <div className={styles.navigationWrapper}>
          <AppNavigation />
          <AppFooter className={styles.footer} />
        </div>
      </Sidebar>
      <Main>
        {isModalVisible ? (
          <WalletContent />
        ) : (
          <>
            {CustomHeader && <CustomHeader />}
            {headerText && <Header>{headerText}</Header>}
            {children}
          </>
        )}
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
