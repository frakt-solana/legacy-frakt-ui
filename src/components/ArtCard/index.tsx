import React from 'react'
import styles from './ArtCard.module.scss'

import MOCK_ART_IMAGE from './MOCK_ART_IMAGE.png'

const OWNER_ADDRESS = 'tz1VqpBkA8bkwkWBVWe39LU7VCcD4EG863gP'

const ArtCard = ({ className, onClick = () => {} }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`} onClick={onClick}>
      <img className={styles.image} src={MOCK_ART_IMAGE} alt='Art' />
      <p className={styles.ownerAddress}>
        {truncateString(OWNER_ADDRESS, 7, 4)}
      </p>
    </div>
  )
}

export default ArtCard

const truncateString = (str, startLength, endLength) =>
  `${str.substr(0, startLength)}...${str.substr(str.length - endLength)}`
