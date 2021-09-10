import { COLOR, SHAPE } from '../../components/ArtCard/constants'
import { shortenAddress } from '../../utils/utils'

export const getHeaderText = ({ walletKey, userAddress }) =>
  `${walletKey}` === userAddress
    ? 'My Frakts'
    : userAddress
    ? `Collection of ${shortenAddress(userAddress)}`
    : 'Explore'

export const sortArtsByNew = (arts) =>
  [...arts].sort(({ metadata: metadataA }, { metadata: metadataB }) => {
    return metadataB?.created_at - metadataA?.created_at
  })

export const sortArtsByRarity = (arts) =>
  [...arts].sort(
    ({ rarity: rarityA }, { rarity: rarityB }) => rarityA - rarityB
  )

export const sortArts = (arts, sortBy) =>
  (sortBy === 'rarity' ? sortArtsByRarity : sortArtsByNew)(arts)

export const pluralize = (
  count: number,
  noun: string,
  suffix: string = 's'
): string =>
  count ? `${count} ${noun}${count !== 1 ? suffix : ''}` : `0 ${noun}${suffix}`

export const getPointsForArt = (art) => {
  const pointsMatrix = {
    [SHAPE.Wave]: {
      [COLOR.Magenta]: 1760,
      [COLOR.Red]: 880,
      [COLOR.Orange]: 587,
      [COLOR.White]: 440,
    },
    [SHAPE.Eye]: {
      [COLOR.Magenta]: 352,
      [COLOR.Red]: 176,
      [COLOR.Orange]: 117,
      [COLOR.White]: 88,
    },
    [SHAPE.Star]: {
      [COLOR.Magenta]: 88,
      [COLOR.Red]: 44,
      [COLOR.Orange]: 29,
      [COLOR.White]: 22,
    },
    [SHAPE.Portal]: {
      [COLOR.Magenta]: 59,
      [COLOR.Red]: 29,
      [COLOR.Orange]: 20,
      [COLOR.White]: 15,
    },
    [SHAPE.Net]: {
      [COLOR.Magenta]: 40,
      [COLOR.Red]: 20,
      [COLOR.Orange]: 13,
      [COLOR.White]: 10,
    },
  }

  return pointsMatrix[art.attributes.shape as number][art.attributes.color]
}
