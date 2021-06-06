import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './RarityPage.module.scss'

const Table = ({ head = ['Key', 'Value'], values = [] }: any) => {
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <p>{head[0]}</p>
        <p>{head[1]}</p>
      </div>
      {values.map(([key, value]) => (
        <div>
          <p>{key}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

const RarityPage = (props: any) => {
  return (
    <AppLayout headerText=''>
      <div className={styles.root}>
        <div className={styles.tableContainer}>
          <h2>Figure rarity</h2>
          <Table
            head={['Figure', 'Rarity']}
            values={[
              ['Net', '44%'],
              ['Portal', '30%'],
              ['Star', '20%'],
              ['Eye', '5%'],
              ['Wave', '1%'],
            ]}
          />
        </div>
        <div className={styles.tableContainer}>
          <h2>Color rarity</h2>
          <Table
            head={['Color', 'Rarity']}
            values={[
              ['White', '40%'],
              ['Orange', '30%'],
              ['Red', '20%'],
              ['Magenta/Rainbow', '10%'],
            ]}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default RarityPage
