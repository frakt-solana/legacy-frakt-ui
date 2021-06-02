import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './HomePage.module.scss'
import { ArrowRightIcon } from '../components/icons'

import PORTAl from '../mocks/images/Portal.png'
import { HashLink as Link } from 'react-router-hash-link';

const HeroSection = () => (
  <div
    className={styles.heroSection}
    style={{ backgroundImage: `url('${PORTAl}')`, backgroundSize: '80%' }}
  >
    <h1>Frakt</h1>
    <p>
      Fractal NFT's on Solana
      <Link smooth to='#introTextSection' className={styles.scrollBottomButton}>
        <ArrowRightIcon />
      </Link>
    </p>
  </div>
)

const IntroTextSection = () => (
  <div className={styles.intoTextSection} id='introTextSection'>
    Frakt is generative fractal art NFT collection. We are using the
    mathematical beauty of fractals to generate stunning art and blockchain to
    make every piece of it unique, decentralized and fun.
  </div>
)


const HomePage = (props: any) => {
  return (
    <AppLayout>
      <HeroSection />
      <IntroTextSection />
    </AppLayout>
  )
}

export default HomePage
