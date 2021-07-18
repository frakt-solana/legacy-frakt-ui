import React from 'react'
import { Link } from 'react-router-dom'

import TextSection from '../../components/TextSection'

const HowItWorksSection = () => (
  <TextSection>
    Each frakt represents one piece of art. With total supply of 10 000 frakts,
    there are 5 different figures types and 4 different colors with{' '}
    <Link to='/rarity'>specific chances of generation</Link>
    .<br />
    <br /> Other than that, every generation uses token hash which makes it
    really unique. No one knows how it will look like, and how rare it would be.
    Rarity determines by cryptographically secure random generator, all Frakts
    tokens are stored on Solana's{' '}
    <a href='https://solana.com/' target='_blank' rel='noopener noreferrer'>
      smart contract
    </a>{' '}
    and after generation art is stored on IPFS. All of that makes this project
    trustless and decentralized. Oh, and whole codebase is{' '}
    <a
      href='https://github.com/frakt-solana'
      target='_blank'
      rel='noopener noreferrer'
    >
      opensourced
    </a>
    .
  </TextSection>
)

export default HowItWorksSection
