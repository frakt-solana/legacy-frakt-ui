import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WalletProvider } from './external/contexts/wallet';
import { ConnectionProvider } from './external/contexts/connection';
import { AccountsProvider } from './external/contexts/accounts';

import { StakingProvider } from './contexts/staking';
import { FraktsProvider } from './contexts/frakts';

import { URLS } from './constants';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionPage';
import ArtPage from './pages/ArtPage';
import Page404 from './pages/Page404';
import RarityPage from './pages/RarityPage';
import {
  StakingPage,
  CreateStakePage,
  UnstakePage,
  HarvestPage,
} from './pages/StakePages';
import MarketplacesPage from './pages/MarketplacesPage';
import WalletCollectionPage from './pages/WalletCollectionPage';
import { FrktBalanceProvider } from './contexts/frktBalance';

export function Routes(): JSX.Element {
  return (
    <Router>
      <ConnectionProvider>
        <WalletProvider>
          <AccountsProvider>
            <FrktBalanceProvider>
              <FraktsProvider>
                <StakingProvider>
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
                      path={URLS.STAKING_CREATE}
                      component={(): JSX.Element => <CreateStakePage />}
                    />
                    <Route
                      exact
                      path={URLS.STAKING_UNSTAKE}
                      component={(): JSX.Element => <UnstakePage />}
                    />
                    <Route
                      exact
                      path={URLS.STAKING_HARVEST}
                      component={(): JSX.Element => <HarvestPage />}
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
                </StakingProvider>
              </FraktsProvider>
            </FrktBalanceProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}
