import React from 'react'
import styles from './AppLayout.module.scss'

import AppHeader from '../AppHeader'
import AppFooter from '../AppFooter'

const AppLayout = ({children}: any) => {
  return (
    <div className={styles.root}>
      <AppHeader />
      <div>{children || 'App Body here'}</div>
      <AppFooter />
    </div>
  )
}

export default AppLayout
