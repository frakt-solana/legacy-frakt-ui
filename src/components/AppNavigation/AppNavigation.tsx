import React from 'react'

import { URLS } from '../../constants'
import { useWallet } from '../../contexts/wallet'
import styles from './styles.module.scss'
import { NavigationLink } from './NavigationLink'

interface IAppNavigation {
  className?: string
}

const AppNavigation = ({ className }: IAppNavigation) => {
  const { connected, select, wallet } = useWallet()

  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <NavigationLink to={URLS.EXPLORE} text='Explore' />

      <NavigationLink
        to={`${URLS.USER}/${wallet?.publicKey}`}
        text="My Frakts"
        notLink={!connected}
        onClick={select}
      />
      <NavigationLink to={URLS.RARITY} text='Rarity hdbk' />
    </ul>
  )
}

export default AppNavigation
