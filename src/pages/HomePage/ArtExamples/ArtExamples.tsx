import React from 'react'

import styles from '../styles.module.scss'
import { imageExamples } from './imageExamples'
import { getRandomInt } from './helpers'
import ArtExample from './ArtExample'
import {
  FIRST_CHANGE_DELAYS,
  INTERVALS,
  EXAMPLES_AMOUNT,
  IMAGES_PER_EXAMPLE,
} from './constants'

const ArtExamplesSection = () => (
  <div className={styles.artExamples}>
    {Array(EXAMPLES_AMOUNT)
      .fill(null)
      .map((_, idx) => {
        const imagesSrc = imageExamples.slice(
          idx * IMAGES_PER_EXAMPLE,
          idx * IMAGES_PER_EXAMPLE + IMAGES_PER_EXAMPLE
        )
        const firstChangeDelay = FIRST_CHANGE_DELAYS[getRandomInt(4)]
        const interval = INTERVALS[getRandomInt(4)]

        return (
          <ArtExample
            key={idx}
            imagesSrc={imagesSrc}
            interval={interval}
            firstChangeDelay={firstChangeDelay}
            className={styles.artExamples__example}
          />
        )
      })}
  </div>
)

export default ArtExamplesSection
