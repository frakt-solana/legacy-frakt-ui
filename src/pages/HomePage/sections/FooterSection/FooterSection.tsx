import React from 'react'

import styles from './styles.module.scss'

const FooterSection = () => (
  <div className={styles.root}>

    <p className={styles.disclaimer}>
      Disclaimer: FRAKT is an art experiment with an unaudited smart contract
      aimed at showcasing the nature of fractals and power of the Solana blockchain.
    </p>
    <p className={styles.hosted}>
      Hosted on{' '}
      <a
        href='https://akash.network/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Akash
      </a>
    </p>
  </div>
)

export default FooterSection
