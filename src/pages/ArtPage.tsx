import React from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import styles from './ArtPage.module.scss'
import { shortenAddress } from '../utils/utils'
import PORTAL from '../mocks/images/Portal.png'
import { URLS } from '../constants'

const MOCK_DATA = {
  test_id: [
    ['Owner', shortenAddress('sadjklj2o4j2ojasxlk242jla21asd')],
    ['Figure', 'Portal'],
    ['Color', 'White'],
    ['λ', '156'],
    ['μ', '15'],
    ['Density', '300'],
    ['Distortion', '-320'],
    ['Rarity', '0.001%'],
  ],
}

const MOCK_DATA_2 = [
  {
    metadata: {
      artAccountPubkey: 'asdaskdjlakjdsaluasdlk;',
      isInitialized: true,
      id: 0,
      first_owner_pubkey: 'jlk424cunldasdhalkhds',
      minted_token_pubkey: 'lsdj39447[9sucxhckl',
      is_minted: true,
    },
    attributes: {
      shape: 1,
      color: 1,
      //? Url here?
      art_hash: 2, // Hash of figure+color combination in ranges
      circles_amount: 30,
      fractial_iterations: 7,
      min_rad_low_limit: 150,
      min_rad_high_limit: 60,
      max_rad_low_limit: 150,
      max_rad_high_limit: 1,
      shape_rarity: 30,
      color_rarity: 50,
    },
  },
]

const ArtHeader = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  return (
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
      <div className={styles.title}>{id} or Figure name</div>
    </div>
  )
}

const ArtInfo = ({ data }: any) => {
  return (
    <div className={styles.info}>
      {data.map(([name, value], idx) => (
        <div key={idx}>
          <p>{name}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

const ArtPage = (props: any) => {
  const { id } = useParams<{ id: string }>()

  const artData = MOCK_DATA_2.find(
    ({ metadata }) => metadata.id.toString() === id
  )

  if (!artData) {
    return <Redirect to={URLS.PAGE_404} />
  }

  return (
    <AppLayout CustomHeader={ArtHeader}>
      <div className={styles.artContainer}>
        <img className={styles.image} src={PORTAL} alt='Art' />
        <ArtInfo data={MOCK_DATA['test_id']} />
      </div>
    </AppLayout>
  )
}

export default ArtPage
