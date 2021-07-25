import React, { useEffect, useState, useMemo } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import styles from './styles.module.scss'
import { getHeaderText, sortArts } from './helpers'
import AppLayout from '../../components/AppLayout'
import ArtsList from '../../components/ArtsList'
import ArtsSort from '../../components/ArtsSort'
import Preloader from '../../components/Preloader'
import { useLazyArtsData } from '../../hooks'
import { useWallet } from '../../contexts/wallet'
import NoFraktsBlock from './components/NoFraktsBlock'

const ExplorePage = () => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()
  const { arts: rawArts, getArts, loading } = useLazyArtsData()

  const [sortBy, setSortBy] = useState('created_at')

  const arts = useMemo(() => sortArts(rawArts, sortBy), [rawArts, sortBy])

  useEffect(() => {
    const publicKey =
      `${wallet?.publicKey}` === userAddress
        ? wallet.publicKey
        : userAddress
        ? new PublicKey(userAddress)
        : null
    getArts(publicKey)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  const onSortChange = (sortBy: 'created_at' | 'rarity') => setSortBy(sortBy)

  return (
    <AppLayout
      headerText={getHeaderText({ walletKey: wallet?.publicKey, userAddress })}
      mainClassName={styles.appMain}
    >
      <Helmet>
        <title>{`Explore ${
          userAddress ? `User's frakts` : ''
        } | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      {loading && <Preloader size='lg' className={styles.preloader} />}
      {!loading && !arts.length && (
        <NoFraktsBlock
          myFracts={`${wallet?.publicKey}` === userAddress}
          type={userAddress ? 'user' : 'explore'}
        />
      )}
      {!loading && !!arts.length && (
        <>
          <ArtsSort onChange={onSortChange} />
          <ArtsList arts={arts} />
        </>
      )}
    </AppLayout>
  )
}

export default ExplorePage
