import PORTAL_IMG from './images/Portal.png'
import WAVE_IMG from './images/Wave.png'
import WAVE_RAINBOW_IMG from './images/Wave_rainbow.png'
import NET_ORANGE from './images/Net_orange.png'
import STAR_IMG from './images/Star.png'
const MOCK_OWNER_ADDRESS = 'tz1VqpBkA8bkwkWBVWe39LU7VCcD4EG863gP'

export default [
  {
    id: 0,
    figureName: 'Portal',
    colorName: 'White',
    colorHex: '#FFFFFF',
    alpha: 156,
    mu: 6,
    density: 50,
    distortion: -723,
    address: MOCK_OWNER_ADDRESS,
    imageSrc: PORTAL_IMG,
    rarity: 20.20,
  },
  {
    id: 1,
    figureName: 'Wave',
    colorName: 'White',
    colorHex: '#FFFFFF',
    alpha: 156,
    mu: 6,
    density: 50,
    distortion: -723,
    address: MOCK_OWNER_ADDRESS,
    imageSrc: WAVE_IMG,
    rarity: 0.34,
  },
  {
    id: 2,
    figureName: 'Star',
    colorName: 'Red',
    colorHex: '#FF0000',
    alpha: 156,
    mu: 6,
    density: 50,
    distortion: -723,
    address: MOCK_OWNER_ADDRESS,
    imageSrc: STAR_IMG,
    rarity: 0.34,
  },
  {
    id: 3,
    figureName: 'Wave',
    colorName: 'Rainbow',
    colorHex: 'rainbow',
    alpha: 156,
    mu: 6,
    density: 50,
    distortion: -723,
    address: MOCK_OWNER_ADDRESS,
    imageSrc: WAVE_RAINBOW_IMG,
    rarity: 0.001,
  },
  {
    id: 4,
    figureName: 'Net',
    colorName: 'Orange',
    colorHex: '#ff9900',
    alpha: 156,
    mu: 6,
    density: 50,
    distortion: -723,
    address: MOCK_OWNER_ADDRESS,
    imageSrc: NET_ORANGE,
    rarity: 5,
  },
]
