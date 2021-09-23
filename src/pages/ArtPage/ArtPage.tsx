import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useHistory } from 'react-router-dom'

import AppLayout from '../../components/AppLayout'
import styles from './styles.module.scss'
import { URLS } from '../../constants'
import { PublicKey } from '@solana/web3.js'
import Preloader from '../../components/Preloader'
import ArtHeader from './components/ArtHeader'
import { getHeaderTitle, getArtInfoData } from './helpers'
import Table from '../../components/Table'
import ArtImage from '../../components/ArtImage'
import { useLazyArtImageSrc } from '../../hooks'
import { useFrakts } from '../../contexts/frakts'

const ArtPage = () => {
  const { artAccountPubkey } = useParams<{ artAccountPubkey: string }>()
  const history = useHistory()

  const { frakts, fraktsLoading, getFraktOwner } = useFrakts()

  const [frakt, setFrakt] = useState({
    attributes: null,
    metadata: null,
    rarity: 0,
  })
  const {
    getSrc: getImageSrc,
    src: imageSrc,
    imageFiles,
  } = useLazyArtImageSrc()
  const [ownerAddress, setOwnerAddress] = useState(null)
  const [, setLoadingOwnerAddress] = useState(false)
  const [tokenPubkey, setTokenPubkey] = useState(null)

  const loadOwnerAddress = async (art) => {
    setLoadingOwnerAddress(true)
    const ownerAddress = await getFraktOwner(
      new PublicKey(art?.metadata.minted_token_pubkey)
    )
    setOwnerAddress(ownerAddress.toString())
    setLoadingOwnerAddress(false)
    const tokenPubkey = art?.metadata?.minted_token_pubkey
    setTokenPubkey(tokenPubkey.toString())
  }

  const loadArt = async () => {
    const data = frakts.find(
      (art) => art.metadata.artAccountPubkey === artAccountPubkey
    )
    loadOwnerAddress(data)
    getImageSrc(data)
    setFrakt(data)
  }

  useEffect(() => {
    !fraktsLoading && loadArt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktsLoading])

  useEffect(() => {
    if (frakt?.metadata) {
      getImageSrc(frakt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frakt])

  const onBackButtonHandler = () =>
    history.length <= 2 ? history.replace(URLS.ROOT) : history.goBack()

  return (
    <AppLayout
      CustomHeader={() => (
        <ArtHeader
          title={getHeaderTitle(frakt)}
          onBackButtonClick={onBackButtonHandler}
          imageFile={imageFiles[2]}
        />
      )}
      mainClassName={!imageSrc && styles.appLayoutMain}
    >
      <Helmet>
        <title>{`Art ${
          frakt?.metadata?.art_hash ? `#${frakt.metadata.hash}` : ''
        } | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.artContainer}>
        {!imageSrc ? (
          <div className={styles.preloaderWrapper}>
            <Preloader size='lg' />
          </div>
        ) : (
          <>
            <ArtImage src={imageFiles[1] || imageSrc} preloaderSize='md' />
            {frakt && (
              <div className={styles.info}>
                <Table
                  data={getArtInfoData({
                    ownerAddress,
                    artData: frakt,
                    tokenPubkey,
                  })}
                  size='md'
                />
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default ArtPage
