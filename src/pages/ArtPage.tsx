import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import styles from './ArtPage.module.scss'
import { shortenAddress } from '../utils/utils'
import { URLS } from '../constants'
import { getMintedArtData } from '../mocks/mock_functions'
import { COLOR, getArtName, SHAPE } from '../components/ArtCard'
import MOCK_IMAGE from '../mocks/images/Portal.png'
import { useArts } from '../contexts/artDetails'
import { ipfsUriToGatewayUrl } from '../utils/ipfs'
import { PublicKey } from '@solana/web3.js'
import Preloader from '../components/Preloader'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ArtInfo = ({
  owner,
  tokenPubkey,
  figure,
  color,
  rarity,
  lambda,
  circles,
  attributes
}: any) => {
  const TooltipIcon = ({ text }) => (
    <Tooltip
      color={'#1e1e1e'}
      overlayClassName={styles.tooptip}
      title={text}
    >
      <QuestionCircleOutlined className={styles.questionIcon} />
    </Tooltip>
  )

  return (
    <div className={styles.info}>
      <div>
        <p>Owner</p>
        <p>
          {owner ? (
            <Link to={`${URLS.USER}/${owner}`} className={styles.infoLink}>
              {shortenAddress(owner)}
            </Link>
          ) : (
            'Loading...'
          )}
        </p>
      </div>
      <div>
        <p>Token <TooltipIcon text={`Token public key. Handy for transfer`} /></p>
        <p>{tokenPubkey ? shortenAddress(tokenPubkey) : 'Loading...'}</p>
      </div>
      <div>
        <p>Figure <TooltipIcon text={`Rarity of ${figure} figure shape is ${attributes.shape_rarity.toFixed(2)}%`} /></p>
        <p>{figure}</p>
      </div>
      <div>
        <p>Color <TooltipIcon text={`Rarity of ${color} color is ${attributes.color_rarity.toFixed(2)}%`} /></p>
        <p>{color}</p>
      </div>
      <div>
        <p>Rarity <TooltipIcon text="Chances to get this frakt" /></p>
        <p>{rarity}</p>
      </div>
      <div>
        <p>Circles <TooltipIcon text="Circles is number of lines in figure" /></p>
        <p>{circles}</p>
      </div>
      <div>
        <p>λ <TooltipIcon text="λ determines how many times fraction function was called per line" /></p>
        <p>{lambda}</p>
      </div>
    </div>
  )
}

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
  const [loadingOwnerAddress, setLoadingOwnerAddress] = useState(false)
  const [tokenPubkey, setTokenPubkey] = useState(null);

  const loadImage = async (image_url) => {
    setLoadingImage(true)
    const token = await (await fetch(ipfsUriToGatewayUrl(image_url))).json()
    setImageSrc(ipfsUriToGatewayUrl(token.image))
    setLoadingImage(false)
  }

  const loadOwnerAddress = async (art) => {
    setLoadingOwnerAddress(true)
    const ownerAddress: PublicKey = await getArtOwner(
      new PublicKey(art.metadata.minted_token_pubkey)
    )
    setOwnerAddress(ownerAddress.toString())
    setLoadingOwnerAddress(false)
    const tokenPubkey = await getArtTokenPubkey(ownerAddress.toString(), art.metadata.minted_token_pubkey);
    setTokenPubkey(tokenPubkey.toString());
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
        {`${art.attributes?.color && art.attributes?.shape
          ? getArtName({
            color: art.attributes?.color,
            shape: art.attributes?.shape,
          })
          : ''
          } ${art?.attributes?.art_hash ? `#${art.attributes.art_hash}` : 'Loading...'}`}
      </div>
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
              <ArtInfo
                owner={artInfoData.owner}
                tokenPubkey={artInfoData.tokenPubkey}
                figure={artInfoData.figure}
                color={artInfoData.color}
                rarity={artInfoData.rarity}
                lambda={artInfoData.lambda}
                circles={artInfoData.circles}
                attributes={art?.attributes}
              />
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default ArtPage
