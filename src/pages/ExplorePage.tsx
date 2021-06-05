import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import styles from './ExplorePage.module.scss'
import AppLayout from '../components/AppLayout'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'
import Preloader from '../components/Preloader'
import { useArts } from '../contexts/artDetails'
import { useWallet } from '../contexts/wallet'
// import {
//   getAllMintedArts,
//   getAllUserMintedArts,
// } from '../mocks/mock_functions'
import { shortenAddress } from '../utils/utils'

const getHeaderText = ({ walletKey, userAddress }) => {
  return `${walletKey}` === userAddress
    ? "My Fract's"
    : userAddress
    ? `Collection of ${shortenAddress(userAddress)}`
    : 'Explore'
}

const filterMintedArts = (art => art.metadata.is_minted === true)

const ExplorePage = (props: any) => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()
  const { getUserArts, getArts } = useArts()
  const [headerText, setHeaderText] = useState('Explore')
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setHeaderText(getHeaderText({ walletKey: wallet?.publicKey, userAddress }))
  }, [userAddress, wallet])

  const loadArts = async () => {
    setLoading(true)
    ;`${wallet?.publicKey}` === userAddress
      ? setArts((await getUserArts(wallet?.publicKey)).filter(filterMintedArts))
      : userAddress
      ? setArts((await getUserArts(new PublicKey(userAddress))).filter(filterMintedArts))
      : setArts((await getArts()).filter(filterMintedArts))
    setLoading(false)
  }

  useEffect(() => {
    loadArts()
  }, [userAddress, wallet])

  return (
    <AppLayout headerText={headerText} mainClassName={styles.appMain}>
      {loading ? (
        <Preloader size='lg' className={styles.preloader} />
      ) : (
        <>
          <ArtsSort />
          <ArtsList arts={arts} />
        </>
      )}
    </AppLayout>
  )
}

export default ExplorePage
