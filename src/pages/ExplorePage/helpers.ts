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
