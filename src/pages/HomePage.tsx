import React from 'react'

import AppLayout from '../components/AppLayout'
import styles from './HomePage.module.scss'
import { ArrowRightIcon } from '../components/icons'

import PORTAl from '../mocks/images/Portal.png'
import { Link } from 'react-router-dom'

const HeroSection = () => (
  <div
    className={styles.heroSection}
    style={{ backgroundImage: `url('${PORTAl}')`, backgroundSize: '80%' }}
  >
    <h1>Frakt</h1>
    <p>
      Fractal NFT's on Solana
      <Link to='' className={styles.scrollBottomButton}>
        <ArrowRightIcon />
      </Link>
    </p>
  </div>
)

const HomePage = (props: any) => {
  return (
    <AppLayout>
      <HeroSection />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iste cum
      obcaecati voluptas veniam nisi numquam maiores beatae consequuntur
      laudantium consequatur dolores, eveniet architecto quia fuga officiis
      magni, at earum!
    </AppLayout>
  )
}

export default HomePage
