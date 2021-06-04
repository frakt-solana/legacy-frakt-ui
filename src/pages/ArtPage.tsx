import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import styles from './ArtPage.module.scss'
import { shortenAddress } from '../utils/utils'
import { URLS } from '../constants'
import { getMintedArtData } from '../mocks/mock_functions'
import { COLOR, getArtName, SHAPE } from '../components/ArtCard'
import MOCK_IMAGE from '../mocks/images/Portal.png'

const ArtInfo = ({ data }: any) => {
  return (
    <div className={styles.info}>
      {Object.entries(data).map(([name, value], idx) => (
        <div key={idx}>
          <p>{name}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

const ArtPage = (props: any) => {
  const { artAccountPubkey } = useParams<{ artAccountPubkey: string }>()
  const history = useHistory()

  const [art, setArt] = useState({ attributes: null, metadata: null })

  useEffect(() => {
    const data = getMintedArtData(artAccountPubkey)
    console.log(data)
    !data && history.replace(URLS.PAGE_404)
    setArt(data)
  }, [artAccountPubkey, history])

  const ArtHeader = () => (
    <div className={styles.ArtHeader}>
      <Button
        arrowLeft
        className={styles.backButton}
        onClick={() =>
          history.length <= 2 ? history.replace(URLS.ROOT) : history.goBack()
        }
      >
        Back
      </Button>
      <div className={styles.title}>
        {art.attributes?.color && art.attributes?.shape
          ? getArtName({
              color: art.attributes?.color,
              shape: art.attributes?.shape,
            })
          : ''}
      </div>
    </div>
  )

  const ArtInfoData = {
    Owner: shortenAddress(art.metadata?.artAccountPubkey || ''),
    Figure: SHAPE[art.attributes?.shape],
    Color: COLOR[art.attributes?.color],
    λ: 'Calculate it',
    μ: 'Calculate it',
    Circles: art.attributes?.circles_amount,
    Distortion: 'Calculate it',
  }

  return (
    <AppLayout CustomHeader={ArtHeader}>
      <div className={styles.artContainer}>
        <img
          className={styles.image}
          src={art.attributes?.image_url || MOCK_IMAGE}
          alt='Art'
        />
        {art.metadata && art.attributes && <ArtInfo data={ArtInfoData} />}
      </div>
    </AppLayout>
  )
}

export default ArtPage
