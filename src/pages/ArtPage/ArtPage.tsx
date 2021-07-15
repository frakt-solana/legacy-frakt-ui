import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'

import styles from './styles.module.scss'
import { URLS } from '../../constants'
import { useArts } from '../../contexts/artDetails'
import { ipfsUriToGatewayUrl } from '../../utils/ipfs'
import { PublicKey } from '@solana/web3.js'
import Preloader from '../../components/Preloader'
import { Helmet } from 'react-helmet'

import ArtHeader from './components/ArtHeader'
import { getHeaderTitle, getArtInfoData } from './helpers'
import Table from '../../components/Table'

const ArtPage = () => {
  const { artAccountPubkey } = useParams<{ artAccountPubkey: string }>()
  const history = useHistory()
  const { arts, getArts, getArtOwner, getArtTokenPubkey } = useArts()
  const [loadingImage, setLoadingImage] = useState(true)
  const [imageSrc, setImageSrc] = useState(null)
  const [art, setArt] = useState({
    attributes: null,
    metadata: null,
    rarity: 0,
  })
  const [ownerAddress, setOwnerAddress] = useState(null)
  const [, setLoadingOwnerAddress] = useState(false)
  const [tokenPubkey, setTokenPubkey] = useState(null)

  const loadImage = async (image_url) => {
    setLoadingImage(true)
    const token = await (await fetch(ipfsUriToGatewayUrl(image_url))).json()
    setImageSrc(ipfsUriToGatewayUrl(token.image))
    setLoadingImage(false)
  }

  const loadOwnerAddress = async (art) => {
    setLoadingOwnerAddress(true)
    const ownerAddress: PublicKey = await getArtOwner(
      new PublicKey(art?.metadata.minted_token_pubkey)
    )
    setOwnerAddress(ownerAddress.toString())
    setLoadingOwnerAddress(false)
    const tokenPubkey = await getArtTokenPubkey(
      ownerAddress.toString(),
      art.metadata.minted_token_pubkey
    )
    setTokenPubkey(tokenPubkey.toString())
  }

  const loadArt = async () => {
    const data = arts.find(
      (art) => art.metadata.artAccountPubkey === artAccountPubkey
    )

    if (!data) {
      const arts = await getArts()
      const data = arts.find(
        (art) => art.metadata.artAccountPubkey === artAccountPubkey
      )
      loadOwnerAddress(data)
      loadImage(data.attributes?.image_url)
      return setArt(data)
    }

    loadOwnerAddress(data)
    loadImage(data.attributes?.image_url)
    setArt(data)
  }

  useEffect(() => {
    loadArt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artAccountPubkey])

  const onBackButtonHandler = () =>
    history.length <= 2 ? history.replace(URLS.ROOT) : history.goBack()

  return (
    <AppLayout
      CustomHeader={() => (
        <ArtHeader
          title={getHeaderTitle(art)}
          onBackButtonClick={onBackButtonHandler}
        />
      )}
      mainClassName={!!loadingImage && styles.appLayoutMain}
    >
      <Helmet>
        <title>{`Art ${
          art?.metadata?.art_hash ? `#${art.metadata.hash}` : ''
        } | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.artContainer}>
        {loadingImage ? (
          <div className={styles.preloaderWrapper}>
            <Preloader size='lg' />
          </div>
        ) : (
          <>
            <img className={styles.image} src={imageSrc} alt='Art' />
            {art && (
              <div className={styles.info}>
                <Table
                  data={getArtInfoData({
                    ownerAddress,
                    artData: art,
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
