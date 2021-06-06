import React, { useState } from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'
import { Link } from 'react-router-dom'
import { URLS } from '../../constants'
import InfiniteScroll from 'react-infinite-scroll-component'

const MOCK_OWNER_ADDRESS = '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw'

//TODO Fix MOCK_OWNER_ADDRESS

const ARTS_PER_SCROLL = 6

const ArtsList = ({ className, arts }: any) => {
  const [artsToShow, setArtsToShow] = useState(ARTS_PER_SCROLL)

  return (
    <InfiniteScroll
      className={`${styles.root} ${className || ''}`}
      dataLength={artsToShow}
      next={() => {
        console.log("trigger")
        setArtsToShow((prev) => prev + ARTS_PER_SCROLL)}}
      hasMore={true}
      scrollableTarget='mainContent'
      loader={false}
    >
      {arts.slice(0, artsToShow).map((art) => (
        <Link
          to={`${URLS.EXPLORE}/${art.metadata.artAccountPubkey}`}
          key={art.metadata.artAccountPubkey}
        >
          <ArtCard art={art} ownerAddress={MOCK_OWNER_ADDRESS} />
        </Link>
      ))}
    </InfiniteScroll>
  )
}

export default ArtsList
