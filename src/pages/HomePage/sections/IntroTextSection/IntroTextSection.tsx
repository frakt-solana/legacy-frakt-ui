import React from 'react'

import TextSection from '../../components/TextSection'
import { INFO_TEXT_ID } from '../../constants'

const IntroTextSection = () => (
  <TextSection id={INFO_TEXT_ID}>
    Frakt is a generative{' '}
    <a
      href='https://en.wikipedia.org/wiki/Fractal_art'
      target='_blank'
      rel='noopener noreferrer'
    >
      fractal art
    </a>{' '}
    NFT collection. We harness the mathematical nature of fractals to generate intricate design patterns. Built on Solana, every image is unique and exists as an NFT.
  </TextSection>
)

export default IntroTextSection
