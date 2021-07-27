import React, { useEffect, useState, useMemo } from 'react'
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
// import UpgradeSection from './components/UpgradeSection'

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
      CustomHeader={() => (
        <ExploreHeader
          walletKey={wallet?.publicKey}
          userAddress={userAddress}
        />
      )}
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
          {/* {`${wallet?.publicKey}` === userAddress && !!OLD_FRAKTS_AMOUNT && (
            <UpgradeSection
              oldFraktsAmount={OLD_FRAKTS_AMOUNT}
              tooltipText={TOOLTIP_TEXT}
              onUpgradeClick={() => console.log('TODO: add logic here')}
            />
          )} */}
          <ArtsSort onChange={onSortChange} />
          <ArtsList arts={arts} />
        </>
      )}
    </AppLayout>
  )
}

// const TOOLTIP_TEXT =
//   "Go into a room to decide you didn't want to be in there anyway be superior. Run outside as soon as door open what a cat-ass-trophy! meowing chowing and wowing meow meow mama head nudges and cats go for world domination. Stand with legs in litter box, but poop outside while happily ignoring when being called yet good morning sunshine mouse scratch at the door then walk away. Push your water glass on the floor crusty butthole and chirp at birds for fight an alligator and win. Sniff all the things nap all day there's a forty year old lady there let us feast thug cat a nice warm laptop for me to sit on or please stop looking at your phone and pet me but sniff catnip and act crazy. Stare at ceiling toilet paper attack claws fluff everywhere meow miao french ciao litterbox look at dog hiiiiiisssss."
// const OLD_FRAKTS_AMOUNT = 10

export default ExplorePage
