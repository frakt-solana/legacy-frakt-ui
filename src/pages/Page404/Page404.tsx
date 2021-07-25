import React from 'react'

import AppLayout from '../../components/AppLayout'
import styles from './styles.module.scss'

const Page404 = () => (
  <AppLayout>
    <div className={styles.root}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>This page does not exist</p>
    </div>
  </AppLayout>
)

export default Page404
