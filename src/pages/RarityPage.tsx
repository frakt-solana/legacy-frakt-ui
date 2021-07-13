import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './RarityPage.module.scss'

import Table from '../components/Table'

const RarityPage = () => {
  return (
    <AppLayout headerText=''>
      <div className={styles.root}>
        <div className={styles.tableContainer}>
          <h2>Figure rarity</h2>
          <Table
            header={['Figure', 'Rarity']}
            data={[
              ['Net', '44%'],
              ['Portal', '30%'],
              ['Star', '20%'],
              ['Eye', '5%'],
              ['Wave', '1%'],
            ]}
            size='md'
          />
        </div>
        <div className={styles.tableContainer}>
          <h2>Color rarity</h2>
          <Table
            header={['Color', 'Rarity']}
            data={[
              ['White', '40%'],
              ['Orange', '30%'],
              ['Red', '20%'],
              ['Magenta/Rainbow', '10%'],
            ]}
            size='md'
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default RarityPage
