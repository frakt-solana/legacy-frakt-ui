import React from 'react'

import TextSection from '../../components/TextSection'
import { INFO_TEXT_ID } from '../../constants'

const IntroTextSection = () => (
  <TextSection id={INFO_TEXT_ID}>
    Frakt is generative{' '}
    <a
      href='https://en.wikipedia.org/wiki/Fractal_art'
      target='_blank'
      rel='noopener noreferrer'
    >
      fractal art
    </a>{' '}
    NFT collection. We use the mathematical beauty of fractals to generate
    stunning art and Solana blockchain to make every piece of it unique,
    decentralized and fun to interact as NFT
  </TextSection>
)

export default IntroTextSection
