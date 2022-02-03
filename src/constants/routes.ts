import { PATHS } from './paths';
import {
  ArtPage,
  CollectionsPage,
  CreateStakeNftPage,
  HarvestNftPage,
  HomePage,
  MarketplacesPage,
  Page404,
  RarityPage,
  StakeFrktPage,
  StakePage,
  StakingNftPage,
  UnstakeNftPage,
  WalletCollectionPage,
} from '../pages';

interface Route {
  path: string;
  exact: boolean;
  component: () => JSX.Element;
}

export const routes: Route[] = [
  {
    exact: true,
    path: PATHS.ROOT,
    component: HomePage,
  },
  {
    exact: true,
    path: `${PATHS.WALLET}${PATHS.WALLET_PUBLIC_KEY}`,
    component: WalletCollectionPage,
  },
  {
    exact: true,
    path: PATHS.COLLECTION,
    component: CollectionsPage,
  },
  {
    exact: true,
    path: `${PATHS.COLLECTION}${PATHS.ART_ACCOUNT_PUBLIC_KEY}`,
    component: ArtPage,
  },
  {
    exact: true,
    path: PATHS.RARITY,
    component: RarityPage,
  },
  {
    exact: true,
    path: PATHS.STAKING_NFT,
    component: StakingNftPage,
  },
  {
    exact: true,
    path: PATHS.STAKING_NFT_CREATE,
    component: CreateStakeNftPage,
  },
  {
    exact: true,
    path: PATHS.STAKING_NFT_UNSTAKE,
    component: UnstakeNftPage,
  },
  {
    exact: true,
    path: PATHS.STAKING_NFT_HARVEST,
    component: HarvestNftPage,
  },
  {
    exact: true,
    path: PATHS.MARKETPLACE,
    component: MarketplacesPage,
  },
  {
    exact: true,
    path: PATHS.STAKE,
    component: StakePage,
  },
  {
    exact: true,
    path: PATHS.STAKING_FRKT,
    component: StakeFrktPage,
  },
  {
    exact: true,
    path: PATHS.PAGE_404,
    component: Page404,
  },
  {
    exact: true,
    path: '*',
    component: Page404,
  },
];
