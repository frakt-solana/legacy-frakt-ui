import { PublicKey } from '@solana/web3.js'
export const getAllArts = (): Array<Object> => MOCK_ALL_ARTS

export const getAllMintedArts = () =>
  MOCK_ALL_ARTS.filter(({ metadata }) => metadata.is_minted === true)

export const getAllUserArts = (userPublicKey: PublicKey) =>
  MOCK_ALL_ARTS.filter(({ metadata }) => metadata.is_minted === true)

export const getAllUserMintedArts = (userPublicKey: PublicKey) =>
  getAllUserArts(userPublicKey).filter(
    ({ metadata }) => metadata.is_minted === true
  )

export const getArtData = (artAccountPubkey: string) =>
  MOCK_ALL_ARTS.find(
    ({ metadata }) => metadata.artAccountPubkey === artAccountPubkey
  )

export const getMintedArtData = (artAccountPubkey: string) =>
  getAllMintedArts().find(
    ({ metadata }) => metadata.artAccountPubkey === artAccountPubkey
  )

const MOCK_ALL_ARTS = [
  {
    metadata: {
      artAccountPubkey: 'F4D2oKNiVof9xsoHyH3guyXHQojxAcCdk3Fx71Km2RgF',
      isInitialized: true,
      id: 5,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '9ecmt6yLBEaPyvYxdUzsqS376PWRc1RLe65JFZVpRfvZ',
      isInitialized: true,
      id: 4,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: '7AnxgG3hM4gYWpYrcq8dKA9N6AsjYxSNmL1BfU1TiZwb',
      is_minted: true,
    },
    attributes: {
      shape: 4,
      color: 1,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '9T2RwAvDkqEurdVPjfnnPN5KtvfKdJvnmojMEFfESRnZ',
      isInitialized: true,
      id: 9,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: 'CFFRC3QYjkCUCVtv8WCsKn6gMe8SYk7CTaqfvgFQtC26',
      is_minted: true,
    },
    attributes: {
      shape: 3,
      color: 4,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: 'E1YoXXzCW83NTwTMNUopvCijJdrdfDbpTjtGeTKZVFRa',
      isInitialized: true,
      id: 12,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: 'CuVrxT9918AooNr6CA5W379G7F1XFPTFu1UAWGuYZzoW',
      isInitialized: true,
      id: 10,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '9LWcGZXSyGga2bGvdyEovvDfAYRGvshnZSGJdHz3Rq3h',
      isInitialized: true,
      id: 7,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: '9WpioYJtwf5ntTx3B2ZrBDByFGTyhjvZz4r1hkX59FbW',
      is_minted: true,
    },
    attributes: {
      shape: 1,
      color: 3,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: 'Hsx9yQkqiL5A6vTf2QRjcVBDCzNKTssgiagBVbWXmtd7',
      isInitialized: true,
      id: 3,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: 'nmPRdEQrmp6soRimLvogW92RG6Aj2vi494RAVN768CA',
      is_minted: true,
    },
    attributes: {
      shape: 1,
      color: 1,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '69gMcndZrjUdhgCc1qYtDJ7s3X95pUR6HEFkkxNJUkia',
      isInitialized: true,
      id: 8,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '4ToM8CCS6mdiE8dFBYhgSyQAWMATTCn9wbfKwReybBvV',
      isInitialized: true,
      id: 2,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: '5sAdZkmEvxBh7nM7q5asjzmWDeRqDJcLneiF3fNMHcUi',
      is_minted: true,
    },
    attributes: {
      shape: 2,
      color: 2,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: 'FvVfRDyBnW8KjdjeveuGdBmMTdQoD95b7X6De9YDrbi1',
      isInitialized: true,
      id: 1,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: 'Ht1yx8tz48vbesYFAtLMPNFCaVo2pKsQXYkfo7pZxhDi',
      is_minted: true,
    },
    attributes: {
      shape: 5,
      color: 4,
      art_hash: 2,
      circles_amount: 7,
      fractial_iterations: 14,
      min_rad_low_limit: 3,
      min_rad_high_limit: 8,
      max_rad_low_limit: 102,
      max_rad_high_limit: 305,
      shape_rarity: 2,
      color_rarity: 70,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: 'HPnYfzs89YkaWejcNqzDbM896q3GNS6B27bhzy2X5Jcz',
      isInitialized: true,
      id: 6,
      first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
  {
    metadata: {
      artAccountPubkey: '4jLQukhsSMZmaGJVZFQ4oifHDu5LqqWjGehrKDDTdWBy',
      isInitialized: true,
      id: 11,
      first_owner_pubkey: '4FQEivpqXX2SN4nFR9k8uuawGdcwDQ6GQpBjEXsvXLTw',
      minted_token_pubkey: '11111111111111111111111111111111',
      is_minted: false,
    },
    attributes: {
      shape: 0,
      color: 0,
      art_hash: 0,
      circles_amount: 0,
      fractial_iterations: 0,
      min_rad_low_limit: 0,
      min_rad_high_limit: 0,
      max_rad_low_limit: 0,
      max_rad_high_limit: 0,
      shape_rarity: 0,
      color_rarity: 0,
      image_url: '',
    },
  },
]
