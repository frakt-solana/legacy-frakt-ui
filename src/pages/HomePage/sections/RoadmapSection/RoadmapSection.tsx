import React from 'react'

import styles from './styles.module.scss'

const RoadmapSection = () => (
  <div className={styles.root}>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>VRF ORACLE</h2>
        <p>
          Lacking of oracle with Verified Random Function on Solana. But we for
          sure can build such oracle. It definetly needed for games, gambling
          and other projects needed random just like ours
        </p>
      </div>
    </div>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>AIRDROPS</h2>
        <p>
          We would be thrilled to collaborate with interesting projects from
          this hackathon or ecosystem in general to provide more liquidity for
          collection holders
        </p>
      </div>
    </div>
    <div className={styles.roadMapContainer}>
      <div className={styles.roadMapContent}>
        <h2>NFT MARKETPLACE</h2>
        <p>
          All frakts can be traded p2p since day one, but we believe that we can
          build some better marketplace than solible.io. It will be with
          verified artists, royalties and more
        </p>
      </div>
    </div>
  </div>
)

export default RoadmapSection
