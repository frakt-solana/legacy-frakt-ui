import React from 'react'

import styles from './styles.module.scss'

const FooterSection = () => (
  <div className={styles.root}>
    <p className={styles.disclaimer}>
      Developed as a part of{' '}
      <a
        className={styles.solanaLink}
        href='https://solana.com/solanaszn'
        target='_blank'
        rel='noopener noreferrer'
      >
        Solana Season
      </a>
    </p>
    <p className={styles.disclaimer}>
      Disclaimer: FRAKT is an art experiment with an unaudited smart contract
      aimed at showcasing possibilities of Solana
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
