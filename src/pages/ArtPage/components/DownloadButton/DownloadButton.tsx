import React, { useState } from 'react'

import Button from '../../../../components/Button'
import { downloadImageFromURL } from './helpers'
import { SpinnerIcon, DownloadIcon } from '../../../../icons'
import styles from './styles.module.scss'


export const useDownloadArt = () => {
  const [loading, setLoading] = useState(false)

  const downloadArt = async (src: string, imageName?: string) => {
    setLoading(true)

    try {
      await downloadImageFromURL(src, imageName)
    } catch (error) {

    }
    setLoading(false)
  }

  return { loading, downloadArt }
}

interface IDownloadButtonProps {
  className?: string
  size?: string
  imageFile: string
  title: string
}



const DownloadButton = ({
  className = '',
  size = 'md',
  imageFile,
  title
}: IDownloadButtonProps) => {
  const { loading, downloadArt } = useDownloadArt()

  const clickHandler = () =>
    downloadArt(imageFile, title)

  return (
    <Button
      className={`${className} ${loading ? styles.spinIcon : ''}`}
      size={size}
      Icon={loading ? SpinnerIcon : DownloadIcon}
      onClick={clickHandler}
      disabled={loading || !imageFile}
    >
      Download
    </Button>
  )
}

export default DownloadButton
