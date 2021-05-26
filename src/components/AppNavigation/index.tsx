import React from 'react'
import { NavLink } from 'react-router-dom'
import { URLS } from '../../constants'
import styles from './AppNavigation.module.scss'

const AppNavigation = ({ className }: any) => {
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
        <NavLink
          className={styles.link}
          activeClassName={styles.activeLink}
          to={URLS.MY_FACTS}
        >
          My Fract's
        </NavLink>
      </li>
    </ul>
  )
}

export default AppNavigation
