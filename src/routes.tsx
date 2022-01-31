import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';

import { StakingProvider } from './contexts/staking';
import { FraktsProvider } from './contexts/frakts';

import { URLS } from './constants';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionPage';
import ArtPage from './pages/ArtPage';
import Page404 from './pages/Page404';
import RarityPage from './pages/RarityPage';
import { StakePage } from './pages/StakePage';
import {
  StakingNftPage,
  CreateStakeNftPage,
  UnstakeNftPage,
  HarvestNftPage,
} from './pages/StakeNftPages';
import MarketplacesPage from './pages/MarketplacesPage';
import WalletCollectionPage from './pages/WalletCollectionPage';
import { FrktBalanceProvider } from './contexts/frktBalance';
import { StakeFrktPage } from './pages/StakeFrktPage';
import { StakingFrktProvider } from './contexts/stakingFrkt';
import { ENDPOINT, NETWORK } from './config';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from './contexts/walletModal';
import React from 'react';
import MarketPage from './pages/MarketPage';

const wallets = [
  getPhantomWallet(),
  getSolflareWallet(),
  getLedgerWallet(),
  getSolletWallet({ network: NETWORK as WalletAdapterNetwork }),
  getSolletExtensionWallet({ network: NETWORK as WalletAdapterNetwork }),
];

export function Routes(): JSX.Element {
  return (
    <Router>
      <WalletModalProvider>
        <ConnectionProvider endpoint={ENDPOINT}>
          <WalletProvider wallets={wallets} autoConnect>
            <FrktBalanceProvider>
              <FraktsProvider>
                <StakingFrktProvider>
                  <StakingProvider>
                    <>
                      <div className="noise" />
                      <Switch>
                        <Route
                          exact
                          path={URLS.ROOT}
                          component={(): JSX.Element => <HomePage />}
                        />
                        <Route
                          exact
                          path={`${URLS.WALLET}/:walletPubkey`}
                          component={(): JSX.Element => (
                            <WalletCollectionPage />
                          )}
                        />
                        <Route
                          exact
                          path={URLS.COLLECTION}
                          component={(): JSX.Element => <CollectionsPage />}
                        />
                        <Route
                          exact
                          path={`${URLS.COLLECTION}/:artAccountPubkey`}
                          component={(): JSX.Element => <ArtPage />}
                        />
                        <Route
                          exact
                          path={URLS.RARITY}
                          component={(): JSX.Element => <RarityPage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKING_NFT}
                          component={(): JSX.Element => <StakingNftPage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKING_NFT_CREATE}
                          component={(): JSX.Element => <CreateStakeNftPage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKING_NFT_UNSTAKE}
                          component={(): JSX.Element => <UnstakeNftPage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKING_NFT_HARVEST}
                          component={(): JSX.Element => <HarvestNftPage />}
                        />
                        <Route
                          exact
                          path={URLS.MARKET}
                          component={(): JSX.Element => <MarketPage />}
                        />
                        <Route
                          exact
                          path={URLS.MARKETPLACE}
                          component={(): JSX.Element => <MarketplacesPage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKE}
                          component={(): JSX.Element => <StakePage />}
                        />
                        <Route
                          exact
                          path={URLS.STAKING_FRKT}
                          component={(): JSX.Element => <StakeFrktPage />}
                        />
                        <Route
                          exact
                          path={URLS.PAGE_404}
                          component={(): JSX.Element => <Page404 />}
                        />
                        <Route
                          exact
                          path={'*'}
                          component={(): JSX.Element => <Page404 />}
                        />
                      </Switch>
                    </>
                  </StakingProvider>
                </StakingFrktProvider>
              </FraktsProvider>
            </FrktBalanceProvider>
          </WalletProvider>
        </ConnectionProvider>
      </WalletModalProvider>
    </Router>
  );
}
