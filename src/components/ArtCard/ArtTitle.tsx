import React from 'react'

import styles from './styles.module.scss'
import { SHAPE, COLOR, COLOR_HEX } from './constants'
import { getArtName } from './helpers'

interface IArtTitleProps {
  color?: string
  shape?: string
}

export const ArtTitle = ({ color = '', shape = '' }: IArtTitleProps) => {
  const isRainbow = ({ shape, color }) =>
    !!(shape === SHAPE.Wave && color === COLOR.Magenta)

  return (
    <p
      className={`${styles.title} ${
        isRainbow({ shape, color }) && styles.rainbowColor
      }`}
      style={{ color: COLOR_HEX[color] }}
    >
      {getArtName({ color, shape })}
    </p>
  )
}
