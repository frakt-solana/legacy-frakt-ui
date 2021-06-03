import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './Page404.module.scss'

const Page404 = (props: any) => {
  return (
    <AppLayout headerText=''>
      <div className={styles.root}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>This page does not exist</p>
      </div>
    </AppLayout>
  )
}

export default Page404
