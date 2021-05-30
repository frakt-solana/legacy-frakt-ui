import React from 'react'
import Button from '../Button'
import styles from './ArtContent.module.scss'
import PORTAL from '../../mocks/images/Portal.png'
import { shortenAddress } from '../../utils/utils'
import { useArtDetails } from '../../contexts/artDetails'

const MOCK_DATA = [
  ['Owner', shortenAddress('sadjklj2o4j2ojasxlk242jla21asd')],
  ['Figure', 'Portal'],
  ['Color', 'White'],
  ['λ', '156'],
  ['μ', '15'],
  ['Density', '300'],
  ['Distortion', '-320'],
  ['Rarity', '0.001%'],
]


const ArtContentHeader = () => {

  const { setData } = useArtDetails()

  return (
    <div className={styles.ArtContentHeader}>
      <Button
        arrowLeft
        className={styles.backButton}
        onClick={() => setData([])}
      >
        Back
      </Button>
      <div className={styles.title}>White portal</div>
    </div>
  )
}

const ArtInfo = ({ data }: any) => {
  return (
    <div className={styles.info}>
      {data.map(([name, value]) => (
        <div>
          <p>{name}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

const ArtContent = ({ className }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ArtContentHeader />
      <div className={styles.artContainer}>
        <img className={styles.image} src={PORTAL} alt='Art' />
        <ArtInfo data={MOCK_DATA} />
      </div>
    </div>
  )
}

export default ArtContent
