import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './HomePage.module.scss'
import { ArrowRightIcon } from '../components/icons'
import TextScramble from '@twistezo/react-text-scramble'
import PORTAL from '../mocks/images/Portal.png'
import WAVE_RAINBOW from '../images/waveRainbow.png'
import STAR_WHITE from '../images/starWhite.png'
import PORTAL_ORANGE from '../images/portalOrange.png'
import EYE_MAGENTA from '../images/eyeMagenta.png'
import NET_RED from '../images/netRed.png'
import EYE_WHITE from '../images/eyeWhite.png'
import HERO_BG from '../images/heroImage.svg'
import { HashLink as Link } from 'react-router-hash-link'

const HeroSection = () => (
  <div
    className={styles.heroSection}
    style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: '80%' }}
  >
    <TextScramble
      nextLetterSpeed={100}
      className={styles.heroSectionTitle}
      texts={['Frakt', 'Frakt ']}
      pauseTime={2500}
      paused={false}
      letterSpeed={20}
    />
    {/* <h1>Frakt</h1> */}
    <p>
      Fractal NFT's on Solana
      <Link smooth to='#introTextSection' className={styles.scrollBottomButton}>
        <ArrowRightIcon />
      </Link>
    </p>
  </div>
)

const IntroTextSection = () => (
  <div className={styles.textSection} id='introTextSection'>
    Frakt is generative{' '}
    <a
      href='https://en.wikipedia.org/wiki/Fractal_art'
      target='_blank'
      rel='noopener noreferrer'
    >
      fractal art
    </a>{' '}
    NFT collection. We are using the mathematical beauty of fractals to generate
    stunning art and blockchain to make every piece of it unique, decentralized
    and fun.
  </div>
)

const ArtExample = ({src}: any) => (
  <div className={styles.artExample}>
    <img src={src} alt='art' />
  </div>
)

const ArtExamplesSection = () => (
  <div className={styles.artExamples}>
    <ArtExample src={STAR_WHITE} />
    <ArtExample src={PORTAL_ORANGE} />
    <ArtExample src={EYE_MAGENTA} />
    <ArtExample src={NET_RED} />
    <ArtExample src={WAVE_RAINBOW} />
    <ArtExample src={EYE_WHITE} />
  </div>
)

const HowItWorksSection = () => (
  <div className={styles.textSection}>
    Each frakt represents one piece of art. With total supply of 10 000 frakts,
    there are 5 different figures types and 4 different colors with{' '}
    <a
      href='https://docs.google.com/spreadsheets/d/1QuXS1_NtmwvBwflQSCZ6L7m5n1midraWZeltrGUx_Yg/edit#gid=1782623236'
      target='_blank'
      rel='noopener noreferrer'
    >
      specific chances of generation
    </a>
    . Other than that, every generation uses your transaction hash which makes
    it really unique and personalized. No one knows how it will look like, and
    how rare it would be. Frakts tokens rarity is decided on Solana's{' '}
    <a href='https://solana.com/' target='_blank' rel='noopener noreferrer'>
      smart contract
    </a>{' '}
    and after NFT minting art is stored on IPFS.
  </div>
)

const HomePage = (props: any) => {
  return (
    <AppLayout>
      <HeroSection />
      <IntroTextSection />
      <ArtExamplesSection />
      <HowItWorksSection />
    </AppLayout>
  )
}

export default HomePage
