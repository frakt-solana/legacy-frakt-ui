import React from 'react'

import styles from './styles.module.scss'

const RoadmapSection = () => (
  <div className={styles.root}>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>VRF ORACLE</h2>
        <p>
          We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.
        </p>
      </div>
    </div>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>AIRDROPS</h2>
        <p>
          We are working with other projects in the Solana ecosystem to provide incentives for Frakt holders.
        </p>
      </div>
    </div>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>NFT MARKETPLACE</h2>
        <p>
          We plan to build a secondary marketplace to buy, sell and trade Frakts. We plan to expand this to other projects in the Solana ecosystem to provide a much-needed secondary marketplace like the ones present on other blockchains.
        </p>
      </div>
    </div>
  </div>
)

export default RoadmapSection
