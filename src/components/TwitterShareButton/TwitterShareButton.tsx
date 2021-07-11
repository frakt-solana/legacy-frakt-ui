import React, { useMemo } from 'react'
import ButtonRegular from '../ButtonRegular'
import { TwitterIcon2 } from '../icons'

const DEFAULT_TWEET_TEXT = 'Look at my FRAKT'

interface ITwitterShareButtonProps {
  className?: string
  size?: string
  url?: string
  tweetText?: string
}
const TwitterShareButton = ({
  className,
  tweetText = DEFAULT_TWEET_TEXT,
  url = window.location.href,
  size = 'md',
}: ITwitterShareButtonProps) => {
  const searchParams = useMemo(
    () =>
      new URLSearchParams({
        hashtags: 'Solana,Tweeter,Frakt',
        text: `${tweetText}\n`,
        url: url,
      }).toString(),
    [tweetText, url]
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
