import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './styles.module.scss'
import { ARTS_PER_SCROLL } from './constants'
import { URLS } from '../../constants'
import ArtCard from '../ArtCard'

interface IArtsListProps {
  className?: string
  arts: any
}

const ArtsList = ({ className = '', arts }: IArtsListProps) => {
  const [artsToShow, setArtsToShow] = useState(ARTS_PER_SCROLL)

  useEffect(() => {
    setArtsToShow(ARTS_PER_SCROLL)
  }, [arts])

  const onScrollHandler = () => setArtsToShow((prev) => prev + ARTS_PER_SCROLL)

  return (
    <InfiniteScroll
      className={`${styles.root} ${className}`}
      dataLength={artsToShow}
      next={onScrollHandler}
      hasMore={true}
      scrollableTarget={window.innerWidth < 1024 ? '#root' : 'mainContent'}
      loader={false}
    >
      {arts.slice(0, artsToShow).map((art) => (
        <Link
          to={`${URLS.EXPLORE}/${art?.metadata?.artAccountPubkey}`}
          key={art?.metadata?.artAccountPubkey}
        >
          <ArtCard art={art} />
        </Link>
      ))}
    </InfiniteScroll>
  )
}

export default ArtsList
