import React from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'
import MOCK_ARTS from '../../mocks/mock_arts'
import { Link } from 'react-router-dom'
import { URLS } from '../../constants'

const ArtsList = ({ className }: any) => {
  return (
    <div
      className={`${styles.root} ${className || ''}`}
    >
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
          <Link to={`${URLS.EXPLORE}/0`} key={id}>
            <ArtCard
              artData={{
                imageSrc,
                address,
                figureName,
                colorName,
                colorHex,
                rarity,
              }}
            />
          </Link>
        )
      )}
    </div>
  )
}

export default ArtsList
