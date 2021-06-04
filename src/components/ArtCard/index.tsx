import React from 'react'
import { shortenAddress } from '../../utils/utils'
import Button from '../Button'
import styles from './ArtCard.module.scss'
import MOCK_IMAGE from '../../mocks/images/Portal.png'

export enum SHAPE {
  Wave = 1,
  Eye = 2,
  Star = 3,
  Portal = 4,
  Net = 5,
}

export enum COLOR {
  Purple = 1,
  Red = 2,
  Orange = 3,
  White = 4,
}

export enum COLOR_HEX {
  '#ff00ff' = 1,
  '#ff0000' = 2,
  '#ff6600' = 3,
  '#ffffff' = 4,
}

export const getArtName = ({
  color,
  shape,
}: {
  color: number
  shape: number
}): string =>
  shape === 1 && color === 1
    ? `Rainbow ${SHAPE[shape]}`
    : `${COLOR[color]} ${SHAPE[shape]}`

export const getArtRarity = ({
  color_rarity,
  shape_rarity,
}: {
  color_rarity: number
  shape_rarity: number
}): number => (color_rarity * shape_rarity) / 100

const ArtTitle = ({ color, shape }: { color: number; shape: number }) => {
  return (
    <p
      className={`${styles.title} ${
        shape === 1 && color === 1 ? styles.titleRainbow : ''
      }`}
      style={{ color: COLOR_HEX[color] }}
    >
      {getArtName({ color, shape }).toLowerCase()}
    </p>
  )
}

const ArtCard = ({ className, art = {}, ownerAddress = '' }: any) => {
  const {
    attributes: { color, color_rarity, shape_rarity, image_url, shape },
  } = art

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ArtTitle color={color} shape={shape} />
      <img className={styles.image} src={image_url || MOCK_IMAGE} alt='Art' />
      <InfoTable
        ownerAddress={ownerAddress}
        rarity={`${getArtRarity({ color_rarity, shape_rarity }).toFixed(2)}%`}
      />
    </div>
  )
}

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

export default ArtCard
