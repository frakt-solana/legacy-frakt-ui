import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import ButtonArrow from '../components/ButtonArrow'
import styles from './ArtPage.module.scss'
import { shortenAddress } from '../utils/utils'
import { URLS } from '../constants'
import { COLOR, getArtName, SHAPE } from '../components/ArtCard'
import MOCK_IMAGE from '../mocks/images/Portal.png'
import { useArts } from '../contexts/artDetails'
import { ipfsUriToGatewayUrl } from '../utils/ipfs'
import { PublicKey } from '@solana/web3.js'
import Preloader from '../components/Preloader'
import { Helmet } from 'react-helmet'

import Table from '../components/Table'
import TwitterShareButton from '../components/TwitterShareButton'
import CopyURLButton from '../components/CopyURLButton'

const ArtPage = (props: any) => {
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
  }, [artAccountPubkey])

  const ArtHeader = () => (
    <div className={styles.ArtHeader}>
      <ButtonArrow
        arrowLeft
        size='lg'
        className={styles.backButton}
        onClick={() =>
          history.length <= 2 ? history.replace(URLS.ROOT) : history.goBack()
        }
      >
        Back
      </ButtonArrow>
      <>
        <div className={styles.title}>
          <div>
            {`${
              art.attributes?.color && art.attributes?.shape
                ? getArtName({
                    color: art.attributes?.color,
                    shape: art.attributes?.shape,
                  })
                : ''
            } ${
              art?.attributes?.art_hash
                ? `#${art.attributes.art_hash}`
                : 'Loading...'
            }`}
          </div>
          <div className={styles.shareButtonsWrapper}>
            <CopyURLButton size='md' />
            <TwitterShareButton size='md' />
          </div>
        </div>
      </>
    </div>
  )

  const artInfoData = {
    owner: ownerAddress || null,
    tokenPubkey: tokenPubkey || null,
    figure: SHAPE[art.attributes?.shape],
    color: COLOR[art.attributes?.color],
    rarity: `${art.rarity.toFixed(2)}%`,
    lambda: art?.attributes?.fractial_iterations,
    circles: art.attributes?.circles_amount,
  }

  return (
    <AppLayout
      CustomHeader={ArtHeader}
      mainClassName={loadingImage ? styles.appLayoutMain : ''}
    >
      <Helmet>
        <title>{`Art ${
          art?.metadata?.art_hash ? `#${art.metadata.hash}` : ''
        } | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.artContainer}>
        {/* TODO: consider d3 animation */}

        {loadingImage ? (
          <div className={styles.preloaderWrapper}>
            <Preloader size='lg' />
          </div>
        ) : (
          <>
            <img
              className={styles.image}
              src={imageSrc || MOCK_IMAGE}
              alt='Art'
            />
            {art.metadata && art.attributes && (
              <div className={styles.info}>
                {/* //TODO: handle error cases and make refactor */}
                <Table
                  data={[
                    [
                      'Owner',
                      ownerAddress
                        ? {
                            text: shortenAddress(ownerAddress),
                            linkTo: `${URLS.USER}/${ownerAddress}`,
                          }
                        : 'Loading...',
                    ],
                    [
                      {
                        text: 'Token',
                        tooltipText: 'Token public key. Handy for transfer',
                      },
                      tokenPubkey ? shortenAddress(tokenPubkey) : 'Loading...',
                    ],
                    [
                      {
                        text: 'Figure',
                        tooltipText: `Rarity of ${
                          SHAPE[art.attributes?.shape]
                        } figure shape is ${art?.attributes?.shape_rarity.toFixed(
                          2
                        )}%`,
                      },
                      SHAPE[art.attributes?.shape],
                    ],
                    [
                      {
                        text: 'Color',
                        tooltipText: `Rarity of ${
                          COLOR[art.attributes?.color]
                        } color is ${art?.attributes?.color_rarity.toFixed(
                          2
                        )}%`,
                      },
                      COLOR[art.attributes?.color],
                    ],
                    [
                      {
                        text: 'Rarity',
                        tooltipText: 'Chances to get this frakt',
                      },
                      `${art.rarity.toFixed(2)}%`,
                    ],
                    [
                      {
                        text: 'Circles',
                        tooltipText: 'Circles is number of lines in figure',
                      },
                      `${art.attributes?.circles_amount}`,
                    ],
                    [
                      {
                        text: 'λ',
                        tooltipText:
                          'λ determines how many times fraction function was called per line',
                      },
                      `${art?.attributes?.fractial_iterations}`,
                    ],
                  ]}
                  size='md'
                />
              </div>
            )}
          </>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      ></div>
    </AppLayout>
  )
}

export default ArtPage
