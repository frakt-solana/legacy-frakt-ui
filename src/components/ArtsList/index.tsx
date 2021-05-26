import React from 'react'
import ArtCard from '../ArtCard'
import styles from './ArtsList.module.scss'

const ArtsList = ({ className }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      {Array(50)
        .fill(null)
        .map((_, idx) => {
          return <ArtCard key={idx} onClick={() => alert('Explore fract modal')} />
        })}
    </div>
  )
}

export default ArtsList
