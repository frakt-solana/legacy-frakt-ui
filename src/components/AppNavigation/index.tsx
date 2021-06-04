import React from 'react'
import { NavLink } from 'react-router-dom'
import { URLS } from '../../constants'
import { useWallet } from '../../contexts/wallet'
import styles from './AppNavigation.module.scss'

const AppNavigation = ({ className }: any) => {
  const { connected, select, wallet } = useWallet()

  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <li>
        <NavLink
          className={styles.link}
          activeClassName={styles.activeLink}
          to={URLS.EXPLORE}
        >
          Explore
        </NavLink>
      </li>

      <li>
        {connected ? (
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            to={`${URLS.USER}/${wallet.publicKey}`}
          >
            My Frakt's
          </NavLink>
        ) : (
          <p className={styles.link} onClick={select}>
            My Frakt's
          </p>
        )}
      </li>
    </ul>
  )
}

export default AppNavigation
