import React from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'
import { Link } from 'react-router-dom'
import { URLS } from '../../constants'

const MOCK_OWNER_ADDRESS = '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw'

//TODO Fix MOCK_OWNER_ADDRESS 


const ArtsList = ({ className, arts }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      {arts.map((art) => {
        return (
          <Link
            to={`${URLS.EXPLORE}/${art.metadata.artAccountPubkey}`}
            key={art.metadata.artAccountPubkey}
          >
            <ArtCard art={art} ownerAddress={MOCK_OWNER_ADDRESS}/>
          </Link>
        )
      })}
      {/* {MOCK_ARTS.map(
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
      )} */}
    </div>
  )
}

export default ArtsList
