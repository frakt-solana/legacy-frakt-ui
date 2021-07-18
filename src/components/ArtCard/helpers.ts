import { SHAPE, COLOR } from './constants'

export const getArtName = ({ color, shape }): string =>
  shape === SHAPE.Wave && color === COLOR.Magenta
    ? `Rainbow ${SHAPE[shape]}`
    : `${COLOR[color]} ${SHAPE[shape]}`
