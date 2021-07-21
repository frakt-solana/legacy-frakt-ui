import React from 'react'
import { PublicKey } from '@solana/web3.js'

import styles from './styles.module.scss'
import { getHeaderText } from '../../helpers'
import CopyURLButton from '../../../../components/CopyURLButton'
import TwitterShareButton from '../../../../components/TwitterShareButton'

interface IExploreHeaderProps {
  userAddress?: string
  walletKey?: PublicKey
}

const TWEET_TEXT =
  'Look at my collection of #frakts so far!\n\nEach #NFT was randomly generated with various rarities. Do you see any you like?'
const HASHTAGS = ['NFTs', 'digitalart', 'NFTcollector', 'NFTart']

const ExploreHeader = ({ userAddress, walletKey }: IExploreHeaderProps) => (
  <div className={`${styles.root} ${userAddress ? '' : styles.hiddenOnMobile}`}>
    <p className={styles.text}>{getHeaderText({ userAddress, walletKey })}</p>
    {!!userAddress && (
      <div className={styles.buttonsWrapper}>
        <CopyURLButton size='md' />
        <TwitterShareButton
          size='md'
          tweetText={TWEET_TEXT}
          hashtags={HASHTAGS}
        />
      </div>
    )}
  </div>
)

export default ExploreHeader
