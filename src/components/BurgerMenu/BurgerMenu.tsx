import React, { useEffect, useState } from 'react'

import { useWallet } from '../../contexts/wallet'
import AppFooter from '../AppFooter'
import AppNavigation from '../AppNavigation'
import ConnectButton from '../ConnectButton'
import CurrentUserTable from '../CurrentUserTable'

import styles from './styles.module.scss'

interface IBurgerMenuProps {
  className?: string
}

const BurgerMenu = ({ className = '' }: IBurgerMenuProps) => {
  const { connected } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <div
        className={`${styles.burgerIcon} ${
          isOpen ? styles.opened : ''
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div
        className={`${styles.menuOverlay} ${
          !isOpen ? styles.menuOverlayHidden : ''
        }`}
      >
        <div className={styles.menuContent} onClick={closeMenu}>
          {connected ? (
            <CurrentUserTable className={styles.table} />
          ) : (
            <ConnectButton />
          )}
          <AppNavigation className={styles.navigation} />
          <AppFooter className={styles.footer} />
        </div>
      </div>
    </>
  )
}

export default BurgerMenu
