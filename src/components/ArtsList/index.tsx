import React, { useEffect, useState } from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'
import { Link } from 'react-router-dom'
import { URLS } from '../../constants'
import InfiniteScroll from 'react-infinite-scroll-component'

const ARTS_PER_SCROLL = 12

const ArtsList = ({ className, arts }: any) => {
  const [artsToShow, setArtsToShow] = useState(ARTS_PER_SCROLL)

  useEffect(() => {
    setArtsToShow(ARTS_PER_SCROLL)
  }, [arts])

  return (
    <InfiniteScroll
      className={`${styles.root} ${className || ''}`}
      dataLength={artsToShow}
      next={() => setArtsToShow((prev) => prev + ARTS_PER_SCROLL)}
      hasMore={true}
      scrollableTarget='mainContent'
      loader={false}
    >
      {arts.slice(0, artsToShow).map((art) => (
        <Link
          to={`${URLS.EXPLORE}/${art.metadata.artAccountPubkey}`}
          key={art.metadata.artAccountPubkey}
        >
          <ArtCard art={art} />
        </Link>
      ))}
    </InfiniteScroll>
  )
}

export default ArtsList
