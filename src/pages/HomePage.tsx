import React, { useEffect, useState } from 'react'

import AppLayout from '../components/AppLayout'
import styles from './HomePage.module.scss'
import { ArrowRightIcon } from '../icons'
import TextScramble from '@twistezo/react-text-scramble'
import { Helmet } from 'react-helmet'
import WAVE_RAINBOW from '../images/waveRainbow.png'
import STAR_WHITE from '../images/starWhite.png'
import PORTAL_ORANGE from '../images/portalOrange.png'
import EYE_MAGENTA from '../images/eyeMagenta.png'
import NET_RED from '../images/netRed.png'
import EYE_WHITE from '../images/eyeWhite.png'
import HERO_BG from '../images/heroImage.svg'
import { HashLink as Link } from 'react-router-hash-link'
import BuyButton from '../components/BuyButton'
import { useArts } from '../contexts/artDetails'

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
      Touch a fractal art
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
    NFT collection. We use the mathematical beauty of fractals to generate
    stunning art and Solana blockchain to make every piece of it unique,
    decentralized and fun to interact as NFT
  </div>
)

const ArtExample = ({
  srcs,
  changeInterval,
  delayBeforeFirstChange = 0,
}: {
  srcs: Array<string>
  changeInterval: number
  delayBeforeFirstChange: number
}) => {
  const [visibleImageIdx, setVisibleImageIdx] = useState(0)

  useEffect(() => {
    setTimeout(
      () =>
        setInterval(() => {
          setVisibleImageIdx((prev) =>
            prev === srcs.length - 1 ? 0 : prev + 1
          )
        }, changeInterval),
      delayBeforeFirstChange
    )
  }, [])

  return (
    <div className={styles.artExample}>
      {srcs.map((src, idx) => (
        <img
          src={src}
          alt='art'
          style={{ display: visibleImageIdx === idx ? 'block' : 'none' }}
        />
      ))}
    </div>
  )
}

const ArtExampleOld = ({ src }: any) => (
  <div className={styles.artExample}>
    <img src={src} alt='art' />
  </div>
)

const ArtExamplesSection = () => (
  <div className={styles.artExamples}>
    <ArtExample
      srcs={[PORTAL_ORANGE, EYE_MAGENTA, NET_RED]}
      changeInterval={1000}
      delayBeforeFirstChange={0}
    />
    <ArtExample
      srcs={[EYE_MAGENTA, PORTAL_ORANGE]}
      changeInterval={1200}
      delayBeforeFirstChange={300}
    />
    <ArtExample
      srcs={[EYE_WHITE, NET_RED, WAVE_RAINBOW]}
      changeInterval={800}
      delayBeforeFirstChange={500}
    />
    <ArtExample
      srcs={[PORTAL_ORANGE, NET_RED]}
      changeInterval={1000}
      delayBeforeFirstChange={0}
    />
    <ArtExample
      srcs={[STAR_WHITE, PORTAL_ORANGE, WAVE_RAINBOW]}
      changeInterval={1200}
      delayBeforeFirstChange={800}
    />
    <ArtExample
      srcs={[PORTAL_ORANGE, NET_RED]}
      changeInterval={1000}
      delayBeforeFirstChange={0}
    />
  </div>
)

const BuySection = () => {
  const { counter, arts } = useArts()
  return (
    <div className={styles.buySection}>
      <div className={styles.buySectionContainer}>
        <div className={styles.buySectionTable}>
          <div>
            <p>Generated</p>
            <p>{`${counter || arts?.length || 0} / 10 000`}</p>
          </div>
          <div>
            <p>Price </p>
            <p>0.5 SOL</p>
          </div>
        </div>
        <BuyButton className={styles.buySectionButton} />
      </div>
    </div>
  )
}

const HowItWorksSection = () => (
  <div className={styles.textSection}>
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
  </div>
)

const RoadMap = ({}: any) => (
  <div className={styles.roadMap}>
    <div
      className={`${styles.roadMapContainer}  ${styles.roadMapContainerLeft}`}
    >
      <div className={styles.roadMapContent}>
        <h2>VRF ORACLE</h2>
        <p>
          Lacking of oracle with Verified Random Function on Solana. But we for
          sure can build such oracle. It definetly needed for games, gambling
          and other projects needed random just like ours
        </p>
      </div>
    </div>
    <div
      className={`${styles.roadMapContainer} ${styles.roadMapContainerRight}`}
    >
      <div className={styles.roadMapContent}>
        <h2>AIRDROPS</h2>
        <p>
          We would be thrilled to collaborate with interesting projects from
          this hackathon or ecosystem in general to provide more liquidity for
          collection holders
        </p>
      </div>
    </div>
    <div
      className={`${styles.roadMapContainer} ${styles.roadMapContainerLeft}`}
    >
      <div className={styles.roadMapContent}>
        <h2>NFT MARKETPLACE</h2>
        <p>
          All frakts can be traded p2p since day one, but we believe that we can
          build some better marketplace than solible.io. It will be with
          verified artists, royalties and more
        </p>
      </div>
    </div>
  </div>
)

const FooterSection = () => (
  <div className={styles.footerSection}>
    <p className={styles.footerDisclaimer}>
      Developed as a part of{' '}
      <a
        href='https://solana.com/solanaszn'
        target='_blank'
        rel='noopener noreferrer'
      >
        Solana Season
      </a>
    </p>
    <p className={styles.footerDisclaimer}>
      Disclaimer: FRAKT is an art experiment with an unaudited smart contract
      aimed at showcasing possibilities of Solana
    </p>
    <p className={styles.footerHosted}>
      Hosted on{' '}
      <a
        href='https://akash.network/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Akash
      </a>
    </p>
  </div>
)

const HomePage = (props: any) => {
  return (
    <AppLayout>
      <HeroSection />
      <IntroTextSection />
      <ArtExamplesSection />
      <div className={styles.textSection}>
        <TextScramble
          nextLetterSpeed={100}
          className={styles.roadMapTitle}
          texts={['No price increase', 'Forever']}
          pauseTime={2500}
          paused={false}
          letterSpeed={20}
        />
      </div>
      <BuySection />
      <HowItWorksSection />
      <div className={styles.textSection}>
        <TextScramble
          nextLetterSpeed={100}
          className={styles.roadMapTitle}
          texts={['Roadmap', 'ROADMAP']}
          pauseTime={2500}
          paused={false}
          letterSpeed={20}
        />
      </div>
      <RoadMap />
      <FooterSection />
    </AppLayout>
  )
}

export default HomePage
