import { clusterApiUrl } from '@solana/web3.js';
import { ENV as ChainID } from '@solana/spl-token-registry';

export type ENV = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet';

export const ENDPOINTS = [
  {
    name: 'mainnet-beta' as ENV,
    endpoint:
      'https://withered-dawn-rain.solana-mainnet.quiknode.pro/0cdeb8d22478dfd10a69465e6179687022b07d28/',
    chainID: ChainID.MainnetBeta,
  },
  {
    name: 'testnet' as ENV,
    endpoint: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet,
  },
  {
    name: 'devnet' as ENV,
    endpoint:
      'https://weathered-summer-haze.solana-devnet.quiknode.pro/b07da26993397d1ce695394f636bc3415bc91a97/',
    chainID: ChainID.Devnet,
  },
  {
    name: 'localnet' as ENV,
    endpoint: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet,
  },
];

const devnet = {
  PROGRAM_PUBLIC_KEY: 'D1bz9T4br5DaRfYx48aSaQsstcfuaytvvArxVjShLwca',
  ADMIN_PUBLIC_KEY: '8CoRNSG1gdWFo5hwWTyn8Vk8QtmwHnNfaLYSRyZ7pme3',
  FARMING_TOKEN_MINT: '2kMr32vCwjehHizggK4Gdv7izk7NhTUyLrH7RYvQRFHH',
  ENDPOINT: ENDPOINTS[2],
  ARTS_CACHE_URL: '/arts_dev.json',
  METADATA_CACHE_URL: '/meta_dev.json',
};

const mainnet = {
  PROGRAM_PUBLIC_KEY: '6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv',
  ADMIN_PUBLIC_KEY: '6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix',
  FARMING_TOKEN_MINT: 'ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj',
  ENDPOINT: ENDPOINTS[0],
  ARTS_CACHE_URL: 'https://cache.frakt.art/arts.json',
  METADATA_CACHE_URL: 'https://cache.frakt.art/meta.json',
};

export default process.env.REACT_APP_NETWORK === 'devnet' ? devnet : mainnet;
