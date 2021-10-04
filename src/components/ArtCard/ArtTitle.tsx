import React from 'react';

import styles from './styles.module.scss';
import { SHAPE, COLOR, COLOR_HEX } from './constants';
import { getArtName } from './helpers';

interface ArtTitleProps {
  color?: number;
  shape?: number;
}

export const ArtTitle = ({
  color = null,
  shape = null,
}: ArtTitleProps): JSX.Element => {
  const isRainbow = ({ shape, color }): boolean =>
    !!(shape === SHAPE.Wave && color === COLOR.Magenta);

  return (
    <p
      className={`${styles.title} ${
        isRainbow({ shape, color }) && styles.rainbowColor
      }`}
      style={{ color: COLOR_HEX[color] }}
    >
      {getArtName({ color, shape })}
    </p>
  );
};
