import React, { useMemo } from 'react'
import ButtonRegular from '../Button'
import { TwitterIcon2 } from '../../icons'

const DEFAULT_TWEET_TEXT =
  'Look at this awesome fractal art #NFT that I just minted!\n\nMint your own unique FRAKT for 0.5 SOL'

const HASHTAGS = ['NFTcollectibles', 'NFTCommunity', 'nftart', 'NFTs']
interface ITwitterShareButtonProps {
  className?: string
  size?: string
  url?: string
  tweetText?: string
  hashtags?: Array<string>
}
const TwitterShareButton = ({
  className,
  tweetText = DEFAULT_TWEET_TEXT,
  url = window.location.href,
  hashtags = HASHTAGS,
  size = 'md',
}: ITwitterShareButtonProps) => {
  const searchParams = useMemo(
    () =>
      new URLSearchParams({
        hashtags: hashtags.join(','),
        text: `${tweetText}\n`,
        url: url,
      }).toString(),
    [tweetText, url, hashtags]
  )

  return (
    <ButtonRegular
      className={className}
      size={size}
      isLink
      linkAttrs={{
        target: '_blank',
        rel: 'noopener noreferrer',
        href: `https://twitter.com/intent/tweet?${searchParams}`,
      }}
      Icon={TwitterIcon2}
    >
      Share
    </ButtonRegular>
  )
}

export default TwitterShareButton
