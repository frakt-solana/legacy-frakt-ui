import React from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'

import MOCK_ART_IMAGE from './MOCK_ART_IMAGE.png'
const MOCK_OWNER_ADDRESS = 'tz1VqpBkA8bkwkWBVWe39LU7VCcD4EG863gP'

const ArtsList = ({ className }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      {Array(50)
        .fill(null)
        .map((_, idx) => {
          return (
            <ArtCard
              key={idx}
              data={{
                imageSrc: MOCK_ART_IMAGE,
                ownerAddress: MOCK_OWNER_ADDRESS,
              }}
              onClick={() => alert('Explore fract modal')}
            />
          )
        })}
    </div>
  )
}

export default ArtsList
