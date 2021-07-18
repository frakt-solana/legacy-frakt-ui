import React, { useEffect } from 'react'

import styles from './styles.module.scss'
import { useLazyArtImageSrc } from '../../hooks'
import ArtImage from '../ArtImage'

import { ArtTitle } from './ArtTitle'
import ButtonArrow from '../ButtonArrow'

interface IArtCardProps {
  className?: string
  art: any
}

const ArtCard = ({ className = '', art = {} }: IArtCardProps) => {
  const {
    attributes: { color, image_url, shape },
  } = art

  const { src, getSrc } = useLazyArtImageSrc()

  useEffect(() => {
    image_url && getSrc(image_url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ArtImage src={src} />
      <div className={styles.infoWrapper}>
        <ArtTitle color={color} shape={shape} />
        <p className={styles.rarity}>
          {art?.rarity ? `${art.rarity.toFixed(2)}%` : ''}
        </p>
        <ButtonArrow size='lg' className={styles.exploreButton}>
          Explore
        </ButtonArrow>
      </div>
    </div>
  )
}

export default ArtCard
