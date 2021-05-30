import React from 'react'
import { shortenAddress } from '../../utils/utils'
import Button from '../Button'
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
      <Button size='sm' className={styles.exploreButton}>Explore</Button>
    </div>
  )
}

const ArtCard = ({ className, onClick = () => {}, artData = {} }: any) => {
  const { figureName, imageSrc, address, colorName, colorHex, rarity } = artData

  return (
    <div className={`${styles.root} ${className || ''}`} onClick={onClick}>
      <p
        className={`${styles.title} ${
          colorName === 'Rainbow' ? styles.titleRainbow : ''
        }`}
        style={{ color: colorHex }}
      >
        {`${colorName} ${figureName}`.toLowerCase()}
      </p>
      <img className={styles.image} src={imageSrc} alt='Art' />
      <InfoTable ownerAddress={address} rarity={`${rarity}%`} />
    </div>
  )
}

export default ArtCard
