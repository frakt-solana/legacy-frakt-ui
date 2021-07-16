import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import HERO_BG from '../../../../images/heroImage.svg'
import { ArrowRightIcon } from '../../../../icons'
import styles from './styles.module.scss'
import ScrambleText from '../../components/ScrambleText'
import { INFO_TEXT_ID } from '../../constants'

const HeroSection = () => (
  <div
    className={styles.root}
    style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: '80%' }}
  >
    <ScrambleText texts={['Frakt', 'Frakt ']} className={styles.title} />
    <p>
      Touch a fractal art
      <Link
        smooth
        to={`#${INFO_TEXT_ID}`}
        className={styles.scrollBottomButton}
      >
        <ArrowRightIcon />
      </Link>
    </p>
  </div>
)

export default HeroSection
