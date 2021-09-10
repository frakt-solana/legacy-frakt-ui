import React from 'react'
import { Link } from 'react-router-dom'

import TextSection from '../../components/TextSection'

const HowItWorksSection = () => (
  <TextSection>
    Each frakt is one uniquely generated art piece. There are 5 different types of fractal images and 4 color schemes,{' '}
    <Link to='/rarity'>each with various rarities</Link>,{' '}and a limited supply of 10,000 frakts out of infinite possibilities.
    <br />
    <br />
    Every fractal generation uses a token hash, making it unique. They are randomly generated, with the rarity determined by a cryptographically secure random generator. All Frakts are stored on Solana's{' '}
    <a href='https://solana.com/' target='_blank' rel='noopener noreferrer'>
      smart contract
    </a>, and after generation the art is stored on Arweave. All of this makes the project trustless and decentralised, and the whole codebase is{' '}
    <a
      href='https://github.com/frakt-solana'
      target='_blank'
      rel='noopener noreferrer'
    >
      open source
    </a>
    .
  </TextSection>
)

export default HowItWorksSection
