import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { WalletProvider } from './external/contexts/wallet';
import { ConnectionProvider } from './external/contexts/connection';
import { AccountsProvider } from './external/contexts/accounts';
import { MarketProvider } from './external/contexts/market';

import { URLS } from './constants';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionPage';
import ArtPage from './pages/ArtPage';
import Page404 from './pages/Page404';
import RarityPage from './pages/RarityPage';
import StakingPage from './pages/StakingPage';
import CreateStakePage from './pages/CreateStakePage';
import MarketplacesPage from './pages/MarketplacesPage';
import { FraktsProvider } from './contexts/frakts';
import WalletCollectionPage from './pages/WalletCollectionPage';

export function Routes(): JSX.Element {
  return (
    <Router>
      <ConnectionProvider>
        <WalletProvider>
          <AccountsProvider>
            <MarketProvider>
              <FraktsProvider>
                <Switch>
                  <Route
                    exact
                    path={URLS.ROOT}
                    component={(): JSX.Element => <HomePage />}
                  />
                  <Route
                    exact
                    path={`${URLS.WALLET}/:walletPubkey`}
                    component={(): JSX.Element => <WalletCollectionPage />}
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
                    path={URLS.STAKING}
                    component={(): JSX.Element => <StakingPage />}
                  />
                  <Route
                    exact
                    path={`${URLS.STAKING}/create`}
                    component={(): JSX.Element => <CreateStakePage />}
                  />
                  <Route
                    exact
                    path={URLS.MARKETPLACE}
                    component={(): JSX.Element => <MarketplacesPage />}
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
              </FraktsProvider>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}
