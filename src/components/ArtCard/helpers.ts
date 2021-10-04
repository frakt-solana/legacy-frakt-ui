import { SHAPE, COLOR } from './constants';

export const getArtName = ({
  color,
  shape,
}: {
  color: number;
  shape: number;
}): string =>
  shape === SHAPE.Wave && color === COLOR.Magenta
    ? `Rainbow ${SHAPE[shape]}`
    : `${COLOR[color]} ${SHAPE[shape]}`;
