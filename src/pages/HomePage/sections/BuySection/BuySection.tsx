import React from 'react'

import styles from './styles.module.scss'
import Table from '../../../../components/Table'

const BuySection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Table
          className={styles.table}
          data={[
            ['Generated', `10 000 / 10 000`],
            ['Price', '0.5 SOL'],
          ]}
        />
      </div>
    </div>
  )
}

export default BuySection
