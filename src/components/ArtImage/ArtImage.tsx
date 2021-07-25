import React from 'react'
import Preloader from '../Preloader'

import styles from './styles.module.scss'

interface IArtImageProps {
  src?: string
  alt?: string
  className?: string
  imageClass?: string
  preloaderSize?: string
}

const ArtImage = ({
  src,
  alt,
  className = '',
  imageClass = '',
  preloaderSize = 'sm',
}: IArtImageProps) => (
  <div className={`${styles.root} ${className}`}>
    <div className={styles.content}>
      {src && (
        <img
          draggable={false}
          className={`${styles.img} ${imageClass}`}
          src={src}
          alt={alt || 'Art image'}
        />
      )}
      <Preloader size={preloaderSize} />
    </div>
  </div>
)

export default ArtImage
