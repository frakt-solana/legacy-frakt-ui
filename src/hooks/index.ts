import { useState } from 'react'
import { ipfsUriToGatewayUrl } from '../utils/ipfs'

export * from './useUserAccounts'
export * from './useAccountByMint'
export * from './useTokenName'
export * from './useUserBalance'
export * from './useUserTotalBalance'

export const useLazyArtImageSrc = () => {
  const [src, setSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSrc = (imageUrl) => {
    setLoading(true)
    fetch(ipfsUriToGatewayUrl(imageUrl))
      .then((res) => res.json())
      .then(({ image }) => {
        setSrc(ipfsUriToGatewayUrl(image))
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  return { src, loading, error, getSrc }
}
