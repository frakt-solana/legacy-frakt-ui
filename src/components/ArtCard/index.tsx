import React from 'react'
import { useArtDetails } from '../../contexts/artDetails'
import { shortenAddress } from '../../utils/utils'
import Button from '../Button'
import styles from './ArtCard.module.scss'

const MOCK_DATA = [
  ['Owner', shortenAddress('sadjklj2o4j2ojasxlk242jla21asd')],
  ['Figure', 'Portal'],
  ['Color', 'White'],
  ['λ', '156'],
  ['μ', '15'],
  ['Density', '300'],
  ['Distortion', '-320'],
  ['Rarity', '0.001%'],
]

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
      <Button size='sm' className={styles.exploreButton}>
        Explore
      </Button>
    </div>
  )
}

const ArtCard = ({ className, artData = {} }: any) => {
  const { figureName, imageSrc, address, colorName, colorHex, rarity } = artData

  const { setData } = useArtDetails()

  return (
    <div
      className={`${styles.root} ${className || ''}`}
      onClick={() => setData(MOCK_DATA)}
    >
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
