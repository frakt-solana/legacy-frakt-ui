import React, { useEffect, useState } from 'react'
import { shortenAddress } from '../../utils/utils'
import Button from '../Button'
import styles from './ArtCard.module.scss'
import MOCK_IMAGE from '../../mocks/images/Portal.png'
import { ipfsUriToGatewayUrl } from '../../utils/ipfs'
import { useArts } from '../../contexts/artDetails'
import { PublicKey } from '@solana/web3.js'
import Preloader from '../Preloader'

export enum SHAPE {
  Wave = 1,
  Eye = 2,
  Star = 3,
  Portal = 4,
  Net = 5,
}

export enum COLOR {
  Purple = 1,
  Red = 2,
  Orange = 3,
  White = 4,
}

export enum COLOR_HEX {
  '#ff00ff' = COLOR.Purple,
  '#ff0000' = COLOR.Red,
  '#ff6600' = COLOR.Orange,
  '#ffffff' = COLOR.White,
}

export const getArtName = ({
  color,
  shape,
}: {
  color: number
  shape: number
}): string =>
  shape === SHAPE.Wave && color === COLOR.Purple
    ? `Rainbow ${SHAPE[shape]}`
    : `${COLOR[color]} ${SHAPE[shape]}`



const ArtTitle = ({ color, shape }: { color: number; shape: number }) => {

  return (
    <p
      className={`${styles.title} ${shape === SHAPE.Wave && color === COLOR.Purple ? styles.titleRainbow : ''
        }`}
      style={{ color: COLOR_HEX[color] }}
    >
      {getArtName({ color, shape }).toLowerCase()}
    </p>
  )
}

const ArtCard = ({ className, art = {} }: any) => {
  const { getArtOwner } = useArts();
  const {
    attributes: { color, color_rarity, shape_rarity, image_url, shape },
  } = art

  const [imageSrc, setImageSrc] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [loadingOwnerAddress, setLoadingOwnerAddress] = useState(false);
  const loadImage = async () => {
    setLoadingImage(true);
    const token = await (await fetch(ipfsUriToGatewayUrl(image_url))).json();
    setImageSrc(ipfsUriToGatewayUrl(token.image));
    setLoadingImage(false);
  }

  const loadOwnerAddress = async () => {
    setLoadingOwnerAddress(true);
    const ownerAddress: PublicKey = await getArtOwner(new PublicKey(art.metadata.minted_token_pubkey));
    console.log({ ownerAddress })
    setOwnerAddress(`${ownerAddress}`);
    setLoadingOwnerAddress(false);
  }

  useEffect(() => {
    loadImage();
    // loadOwnerAddress();
  }, [])

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ArtTitle color={color} shape={shape} />
      {imageSrc ? <img className={styles.image} src={imageSrc} alt='Art' /> : <Preloader width="100%" />}
      <InfoTable
        ownerAddress={ownerAddress}
        rarity={`${art.rarity.toFixed(2)}%`}
      />
    </div>
  )
}

const InfoTable = ({ ownerAddress, rarity }: any) => {
  return (
    <div className={styles.infoTable}>
      <div>
        <p>Rarity</p>
        <p>{rarity}</p>
      </div>
      <Button size='sm' className={styles.exploreButton}>
        Explore
      </Button>
    </div>
  )
}

export default ArtCard
