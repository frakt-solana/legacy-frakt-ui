import React from 'react'
import styles from './ArtCard.module.scss'

const ArtCard = ({ className, onClick = () => {}, data = {} }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`} onClick={onClick}>
      <img className={styles.image} src={data.imageSrc} alt='Art' />
      <p className={styles.ownerAddress}>
        {truncateString(data.ownerAddress, 7, 4)}
      </p>
    </div>
  )
}

export default ArtCard

const truncateString = (str, startLength, endLength) =>
  `${str.substr(0, startLength)}...${str.substr(str.length - endLength)}`
