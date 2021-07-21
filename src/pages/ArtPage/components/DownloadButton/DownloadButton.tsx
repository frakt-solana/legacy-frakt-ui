import React, { useState } from 'react'

import Button from '../../../../components/Button'
import { downloadImageFromURL } from './helpers'
import { SpinnerIcon, DownloadIcon } from '../../../../icons'
import styles from './styles.module.scss'
import { ipfsUriToGatewayUrl } from '../../../../utils/ipfs'

export const useDownloadArt = () => {
  const [loading, setLoading] = useState(false)

  const downloadArt = (ipfsUrl: string, imageName?: string): void => {
    setLoading(true)

    fetch(ipfsUriToGatewayUrl(ipfsUrl))
      .then((res) => res.json())
      .then(({ image }) => {
        const src = ipfsUriToGatewayUrl(image)
        return downloadImageFromURL(src, imageName)
      })
      .finally(() => setLoading(false))
  }

  return { loading, downloadArt }
}

interface IDownloadButtonProps {
  className?: string
  size?: string
}

const IMAGE_URL_IPFS =
  'ipfs://bafyreifbsjysfvggltxiws7i76gfpnf5bnj7hu75spq5ky46f7fk6fwuam/metadata.json'
const IMAGE_NAME = 'image'

const DownloadButton = ({
  className = '',
  size = 'md',
}: IDownloadButtonProps) => {
  const { loading, downloadArt } = useDownloadArt()

  const clickHandler = () =>
    downloadArt(IMAGE_URL_IPFS, IMAGE_NAME /*//? Optional */)

  return (
    <Button
      className={`${className} ${loading ? styles.spinIcon : ''}`}
      size={size}
      Icon={loading ? SpinnerIcon : DownloadIcon}
      onClick={clickHandler}
      disabled={loading}
    >
      Download
    </Button>
  )
}

export default DownloadButton
