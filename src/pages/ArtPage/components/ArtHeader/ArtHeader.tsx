import React from 'react'

import TwitterShareButton from '../../../../components/TwitterShareButton'
import CopyURLButton from '../../../../components/CopyURLButton'
import ButtonArrow from '../../../../components/ButtonArrow'
import styles from './styles.module.scss'
import DownloadButton from '../DownloadButton'

interface IArtHeaderProps {
  title: string
  imageFile: string
  onBackButtonClick: () => void
}

const ArtHeader = ({ title, onBackButtonClick, imageFile }: IArtHeaderProps) => (
  <div className={styles.root}>
    <ButtonArrow
      arrowLeft
      size='lg'
      className={styles.backButton}
      onClick={onBackButtonClick}
    >
      Back
    </ButtonArrow>
    <>
      <div className={styles.title}>
        <div>{title}</div>
        <div className={styles.buttonsWrapper}>
          <DownloadButton size='md' imageFile={imageFile} title={title} />
          <CopyURLButton size='md' />
          <TwitterShareButton size='md' />
        </div>
      </div>
    </>
  </div>
)

export default ArtHeader
