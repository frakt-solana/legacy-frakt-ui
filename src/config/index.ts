import { clusterApiUrl } from '@solana/web3.js';
import { ENV as ChainID } from '@solana/spl-token-registry';

export type ENV = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet';

export const ENDPOINTS = [
  {
    name: 'mainnet-beta' as ENV,
    endpoint: 'https://api.metaplex.solana.com/',
    chainID: ChainID.MainnetBeta,
  },
  {
    name: 'testnet' as ENV,
    endpoint: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet,
  },
  {
    name: 'devnet' as ENV,
    endpoint: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet,
  },
  {
    name: 'localnet' as ENV,
    endpoint: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet,
  },
];

const devnet = {
  PROGRAM_PUBLIC_KEY: '6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv',
  ADMIN_PUBLIC_KEY: 'DQfi54Fspjfi6VyMH1iSDyYAcui2hUF1QRbQ1GM7N1uo',
  ENDPOINT: ENDPOINTS[2],
  ARTS_CACHE_URL: '/arts_dev.json',
  METADATA_CACHE_URL: '/meta_dev.json',
};

const mainnet = {
  PROGRAM_PUBLIC_KEY: '6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv',
  ADMIN_PUBLIC_KEY: '6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix',
  ENDPOINT: ENDPOINTS[0],
  ARTS_CACHE_URL: 'https://cache.frakt.art/arts.json',
  METADATA_CACHE_URL: 'https://cache.frakt.art/meta.json',
};

export default process.env.REACT_APP_NETWORK === 'devnet' ? devnet : mainnet;
