import { useFrakts } from './../contexts/frakts'
import { useState } from 'react'
import { ipfsUriToGatewayUrl } from '../utils/ipfs'

export * from './useUserAccounts'
export * from './useAccountByMint'
export * from './useTokenName'
export * from './useUserBalance'
export * from './useUserTotalBalance'

export const useLazyArtImageSrc = () => {
  const [src, setSrc] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { arweaveMetadata } = useFrakts()

  const setImageFromIpfs = async (imageUrl) => {
    const res = await fetch(ipfsUriToGatewayUrl(imageUrl))
    const { image } = await res.json()
    setSrc(ipfsUriToGatewayUrl(image))
  }

  const setImageFromArweave = async (metadata) => {
    const res = await fetch(metadata.account.info.data.uri)
    const data = await res.json()
    setImageFiles(data.properties.files)
    setSrc(data.image)
  }

  const getSrc = async (art) => {
    setLoading(true)
    const metadata = arweaveMetadata[art.metadata.minted_token_pubkey]

    try {
      if (!metadata) {
        console.log("doesn't have meta")
        await setImageFromIpfs(art.attributes?.image_url)
      } else {
        console.log('has meta')
        await setImageFromArweave(metadata)
      }
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return { src, loading, error, getSrc, imageFiles }
}
