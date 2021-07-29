import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import styles from './styles.module.scss'
import { sortArts } from './helpers'
import AppLayout from '../../components/AppLayout'
import ArtsList from '../../components/ArtsList'
import ArtsSort from '../../components/ArtsSort'
import Preloader from '../../components/Preloader'
import { useLazyArtsData } from '../../hooks'
import { useWallet } from '../../contexts/wallet'
import NoFraktsBlock from './components/NoFraktsBlock'
import ExploreHeader from './components/ExploreHeader'
import UpgradeSection from './components/UpgradeSection'
import { useArts } from '../../contexts/artDetails'
import { notify } from '../../utils/notifications'

const ExplorePage = () => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()
  const { arts: rawArts, getArts, loading } = useLazyArtsData()
  const { upgradeArts } = useArts();
  const [sortBy, setSortBy] = useState('created_at')

  const arts = useMemo(() => sortArts(rawArts, sortBy), [rawArts, sortBy])
  const artsToUpgrade = useMemo(() => arts.filter(art => art.metadata.is_old_version), [arts])

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

  const onUpgradeArts = useCallback(
    async () => {
      const success = await upgradeArts(artsToUpgrade.slice(0, 5))

      success &&
        notify({
          message: 'Success',
          description: 'Your frakts will be updated within seconds. If you have more to go, please wait for previos generation and repeat',
          type: 'success',
        })
    },
    [artsToUpgrade.length],
  )

  const onSortChange = (sortBy: 'created_at' | 'rarity') => setSortBy(sortBy)

  return (
    <AppLayout
      CustomHeader={() => (
        <ExploreHeader
          walletKey={wallet?.publicKey}
          userAddress={userAddress}
        />
      )}
      mainClassName={styles.appMain}
    >
      <Helmet>
        <title>{`Explore ${userAddress ? `User's frakts` : ''
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
          {`${wallet?.publicKey}` === userAddress && !!artsToUpgrade.length && (

            <UpgradeSection
              oldFraktsAmount={artsToUpgrade.length}
              tooltipText={TOOLTIP_TEXT}
              onUpgradeClick={onUpgradeArts}
            />
          )}
          <ArtsSort onChange={onSortChange} />
          <ArtsList arts={arts} />
        </>
      )}
    </AppLayout>
  )
}


const TOOLTIP_TEXT =
  "This update is needed for full Phantom wallet support, high resolution image and ability to trade your frakt later on Marketplace. Please, if you have more than 5 old standard tokens, repeat this operation after transaction confirmation"

export default ExplorePage
