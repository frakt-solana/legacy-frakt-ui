import React from 'react'

import { URLS } from '../../constants'
import styles from './styles.module.scss'
import { NavigationLink } from './NavigationLink'

interface IAppNavigation {
  className?: string
}

const AppNavigation = ({ className }: IAppNavigation) => {
  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <NavigationLink to={URLS.COLLECTION} text='Collection' />
      <NavigationLink to={URLS.RARITY} text='Rarity hdbk' />
    </ul>
  )
}

export default AppNavigation
