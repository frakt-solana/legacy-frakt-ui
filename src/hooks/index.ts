import { useState } from 'react'
import { useArts } from '../contexts/artDetails'
import { ipfsUriToGatewayUrl } from '../utils/ipfs'

export * from './useUserAccounts'
export * from './useAccountByMint'
export * from './useTokenName'
export * from './useUserBalance'
export * from './useUserTotalBalance'

export const useLazyArtImageSrc = () => {
  const [src, setSrc] = useState(null)
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {artMetaByMintKey} = useArts()

  const setImageFromIpfs = async (imageUrl) => {
    const res = await fetch(ipfsUriToGatewayUrl(imageUrl));
    const {image} = await res.json();
    setSrc(ipfsUriToGatewayUrl(image))
  }

  const setImageFromArweave = async (metadata) => {
    const res = await fetch(metadata.account.info.data.uri);
    const data = await res.json()
    setFiles(data.properties.files)
    setSrc(data.image)
  }

  const getSrc = async (art) => {
    setLoading(true)
    const metadata = artMetaByMintKey[art.metadata.minted_token_pubkey]

    try {
      if (!metadata) {
        await setImageFromIpfs(art.attributes?.image_url)
      } else {
        await setImageFromArweave(metadata);
      }
    } catch (error) {
      setError(error);
    }
    
    setLoading(false)
  }

  return { src, loading, error, getSrc, files }
}

export const useLazyArtsData = () => {
  const { getUserArts, getArts: getAllArts } = useArts()
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getArts = (publicKey?) => {
    setLoading(true)
    ;(publicKey ? getUserArts(publicKey) : getAllArts())
      .then((resArts) => setArts(resArts))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  return { arts, loading, error, getArts }
}
