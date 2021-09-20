import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { WalletProvider } from './contexts/wallet'
import { ConnectionProvider } from './contexts/connection'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'

import { URLS } from './constants'

import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionPage'
import ArtPage from './pages/ArtPage'
import Page404 from './pages/Page404'
import RarityPage from './pages/RarityPage'
import { FraktsProvider } from './contexts/frakts'

export function Routes() {
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
                    component={() => <HomePage />}
                  />
                  <Route
                    exact
                    path={URLS.COLLECTION}
                    component={() => <CollectionsPage />}
                  />
                  <Route
                    exact
                    path={`${URLS.COLLECTION}/:artAccountPubkey`}
                    component={() => <ArtPage />}
                  />
                  <Route
                    exact
                    path={URLS.RARITY}
                    component={() => <RarityPage />}
                  />
                  <Route
                    exact
                    path={URLS.PAGE_404}
                    component={() => <Page404 />}
                  />
                  <Route exact path={'*'} component={() => <Page404 />} />
                </Switch>
              </FraktsProvider>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  )
}
