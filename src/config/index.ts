import { clusterApiUrl } from '@solana/web3.js';
import { ENV as ChainID } from '@solana/spl-token-registry';

export type ENV = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet';

const IS_DEVNET = process.env.REACT_APP_NETWORK === 'devnet';

export const ENDPOINTS = [
  {
    name: 'mainnet-beta' as ENV,
    endpoint: 'https://wild-red-morning.solana-mainnet.quiknode.pro/e48180a05f9f7ab63b6d9f0609f0ba675854e471/',
    // endpoint: 'https://fraktion.rpcpool.com',
    // endpoint: 'https://frakt.genesysgo.net/',
    // endpoint:
    //https://ssc-dao.genesysgo.net/
    //https://api.metaplex.solana.com/
    //   'https://wild-muddy-dream.solana-mainnet.quiknode.pro/47edfe015adbb24664df02bc436d4cb6272dc01a/',
    // endpoint: 'https://connect.runnode.com/?apikey=Uj4AiozG48ZxMRra9arc',
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

export const NETWORK = IS_DEVNET ? 'devnet' : 'mainnet-beta';

export const ENDPOINT = IS_DEVNET
  ? clusterApiUrl('devnet')
  : 'https://wild-red-morning.solana-mainnet.quiknode.pro/e48180a05f9f7ab63b6d9f0609f0ba675854e471/';

const devnet = {
  PROGRAM_PUBLIC_KEY: 'D1bz9T4br5DaRfYx48aSaQsstcfuaytvvArxVjShLwca',
  ADMIN_PUBLIC_KEY: '8CoRNSG1gdWFo5hwWTyn8Vk8QtmwHnNfaLYSRyZ7pme3',
  FARMING_TOKEN_MINT: '5h8FAqAtLZ2sxXQkQnpgor39CZ7FwZ8oghXBcYeqtUta',
  FRKT_STAKING_PROGRAM_PUBLIC_KEY:
    '8Tt5SNaGdcvGt7qzoGAzHCyYR7rFiF5PyasvMeuQkMkP',
  ENDPOINT: ENDPOINTS[2],
  ARTS_CACHE_URL: '/arts_dev.json',
  METADATA_CACHE_URL: '/meta_dev.json',
};

const mainnet = {
  PROGRAM_PUBLIC_KEY: '6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv',
  ADMIN_PUBLIC_KEY: '6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix',
  FARMING_TOKEN_MINT: 'ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj',
  FRKT_STAKING_PROGRAM_PUBLIC_KEY:
    '66T91jsvGr9QBvLhkCcQjUfhfFsN4QGRDZ8GNob61Bsp',
  ENDPOINT: ENDPOINTS[0],
  ARTS_CACHE_URL: 'https://cache.frakt.art/arts.json',
  METADATA_CACHE_URL: 'https://cache.frakt.art/meta.json',
};

export default IS_DEVNET ? devnet : mainnet;
