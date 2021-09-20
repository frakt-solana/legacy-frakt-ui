import { shortenAddress } from '../../utils/utils'
import { COLOR, SHAPE } from '../../components/ArtCard/constants'
import { getArtName } from '../../components/ArtCard/helpers'

export const getHeaderTitle = (artData) => {
  const color = artData?.attributes?.color
  const shape = artData?.attributes?.shape
  const artHash = artData?.attributes?.art_hash

  const artName = !!(color && shape) ? getArtName({ color, shape }) : ''

  return !!(artHash && artName) ? `${artName} #${artHash}` : 'Loading...'
}

export const isRainbow = (color, shape): boolean =>
  !!(shape === SHAPE.Wave && color === COLOR.Magenta)

export const getArtInfoData = ({ ownerAddress, tokenPubkey, artData }) => {
  const getShapeName = (artData): string =>
    SHAPE[artData?.attributes?.shape] || ''
  const getShapeRarity = (artData): number =>
    artData?.attributes?.shape_rarity || 0
  const getColorName = (artData): string => {
    const color = COLOR[artData?.attributes?.color]
    return isRainbow(artData?.attributes?.color, artData?.attributes?.shape)
      ? 'Rainbow'
      : color
  }
  const getColorRarity = (artData): number =>
    artData?.attributes?.color_rarity || 0
  const getArtRarity = (artData): number => artData?.rarity || 0
  const getCirclesAmount = (artData): number =>
    artData?.attributes?.circles_amount || 0
  const getFractalIterationsAmount = (artData) =>
    artData?.attributes?.fractial_iterations || 0

  const getShapeTooltip = (artData): string =>
    `Rarity of ${getShapeName(artData)} figure shape is ${getShapeRarity(
      artData
    ).toFixed(2)}%`
  const getColorTooltip = (artData): string =>
    `Rarity of ${getColorName(artData)} color is ${getColorRarity(
      artData
    ).toFixed(2)}%`

  const ownerData = [
    'Owner',
    ownerAddress ? shortenAddress(ownerAddress) : 'Loading...',
  ]

  const tokenData = [
    {
      text: 'Token',
      tooltipText: 'Token public key. Handy for transfer',
    },
    tokenPubkey ? shortenAddress(tokenPubkey) : 'Loading...',
  ]

  const figureData = [
    {
      text: 'Figure',
      tooltipText: getShapeTooltip(artData),
    },
    getShapeName(artData) || 'Loading...',
  ]

  const colorData = [
    { text: 'Color', tooltipText: getColorTooltip(artData) },
    getColorName(artData) || 'Loading...',
  ]

  const rarityData = [
    {
      text: 'Rarity',
      tooltipText: 'Chances to get this frakt',
    },
    `${getArtRarity(artData).toFixed(2)}%`,
  ]

  const circlesData = [
    {
      text: 'Circles',
      tooltipText: 'Circles is number of lines in figure',
    },
    `${getCirclesAmount(artData)}`,
  ]

  const lambdaData = [
    {
      text: 'λ',
      tooltipText:
        'λ determines how many times fraction function was called per line',
    },
    `${getFractalIterationsAmount(artData)}`,
  ]

  return [
    ownerData,
    tokenData,
    figureData,
    colorData,
    rarityData,
    circlesData,
    lambdaData,
  ]
}
