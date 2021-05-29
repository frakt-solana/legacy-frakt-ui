import React from 'react'
import { shortenAddress } from '../../utils/utils'
import styles from './ArtCard.module.scss'

const InfoTable = ({ ownerAddress, rarity }: any) => {
  return (
    <div className={styles.infoTable}>
      <div>
        <p>Owner</p>
        <p>{shortenAddress(ownerAddress)}</p>
      </div>
      <div>
        <p>Rarity</p>
        <p>{rarity}</p>
      </div>
    </div>
  )
}

const ArtCard = ({ className, onClick = () => {}, data = {} }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`} onClick={onClick}>
      <p className={styles.title}>White portal</p>
      <img className={styles.image} src={data.imageSrc} alt='Art' />
      <InfoTable ownerAddress={data.ownerAddress} rarity={'10.23%'} />
    </div>
  )
}

export default ArtCard
