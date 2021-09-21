import React, { useMemo, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import styles from './styles.module.scss'
import AppLayout from '../../components/AppLayout'
import ArtsList from '../../components/ArtsList'
import Preloader from '../../components/Preloader'
import { useFrakts } from '../../contexts/frakts'
import { useHistory, useParams } from 'react-router'
import { shortenAddress } from '../../utils/utils'
import { PublicKey } from '@solana/web3.js'
import { useCollectionFilters } from '../CollectionPage/hooks'
import ArtsFilter from '../../components/ArtsFilter'
import { sortArts } from '../CollectionPage/helpers'
import { URLS } from '../../constants'

const WalletCollectionPage = () => {
  const { walletPubkey } = useParams<{ walletPubkey: string }>()
  const history = useHistory()

  const { fraktsLoading, getWalletFrakts } = useFrakts()

  const [loading, setLoading] = useState<boolean>(true)
  const [walletFrakts, setWalletFrakts] = useState([])

  const { filter, sortBy, onFilterChange, onSortChange } =
    useCollectionFilters()

  useEffect(() => {
    const fetchWalletFrakts = async () => {
      try {
        const frakts = await getWalletFrakts(new PublicKey(walletPubkey))
        setWalletFrakts(frakts)
      } catch (err) {
        history.replace(URLS.PAGE_404)
      } finally {
        setLoading(false)
      }
    }

    if (!fraktsLoading && walletPubkey) {
      fetchWalletFrakts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktsLoading, walletPubkey])

  const frakts = useMemo(
    () => sortArts(walletFrakts, sortBy),
    [walletFrakts, sortBy]
  )

  return (
    <AppLayout
      CustomHeader={() => <Header walletPubkey={walletPubkey} />}
      mainClassName={styles.appMain}
    >
      <Helmet>
        <title>{`Collection of ${walletPubkey} | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      {loading && <Preloader size='lg' className={styles.preloader} />}
      {!loading && (
        <>
          {!frakts.length && <NoFraktsBlock />}
          {!!frakts.length && (
            <ArtsFilter
              hideFilter
              sortValue={sortBy}
              onSortChange={onSortChange}
              filterValue={filter}
              onFilterChangeValue={onFilterChange}
            />
          )}
          <ArtsList arts={frakts} />
        </>
      )}
    </AppLayout>
  )
}

const Header = ({ walletPubkey = '' }: { walletPubkey?: string }) => (
  <div className={styles.header}>
    <p className={styles.header__text}>
      Collection of {shortenAddress(walletPubkey)}
    </p>
  </div>
)

const NoFraktsBlock = () => {
  return (
    <div className={styles.noFrakts}>
      <p className={styles.noFrakts__text}>
        This wallet doesn't have any frakts yet
      </p>
    </div>
  )
}

export default WalletCollectionPage
