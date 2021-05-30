import React from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'
import MOCK_ARTS from '../../mocks/mock_arts'

const ArtsList = ({ className }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      {MOCK_ARTS.map(
        ({
          id,
          imageSrc,
          address,
          figureName,
          colorName,
          colorHex,
          rarity,
        }) => (
          <ArtCard
            key={id}
            artData={{
              imageSrc,
              address,
              figureName,
              colorName,
              colorHex,
              rarity,
            }}
            onClick = {() => alert('Something happens')}
          />
        )
      )}
    </div>
  )
}

export default ArtsList
