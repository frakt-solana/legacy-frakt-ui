import React from 'react'

import styles from './styles.module.scss'
import { useArts } from '../../../../contexts/artDetails'
import BuyButton from '../../../../components/BuyButton'
import Table from '../../../../components/Table'

const BuySection = () => {
  const { counter, arts } = useArts()
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Table
          className={styles.table}
          data={[
            ['Generated', `${counter || arts?.length || 0} / 10 000`],
            ['Price', '0.5 SOL'],
          ]}
        />
        <BuyButton className={styles.buyButton} />
      </div>
    </div>
  )
}

export default BuySection
