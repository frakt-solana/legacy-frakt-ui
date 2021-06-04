import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { WalletProvider } from './contexts/wallet'
import { ConnectionProvider } from './contexts/connection'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'

import { URLS } from './constants'

import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import { ArtDetailsProvider } from './contexts/artDetails'
import ArtPage from './pages/ArtPage'
import Page404 from './pages/Page404'

export function Routes() {
  return (
    <Router>
      <ConnectionProvider>
        <WalletProvider>
          <AccountsProvider>
            <MarketProvider>
              <ArtDetailsProvider>
                <Switch>
                  <Route
                    exact
                    path={URLS.ROOT}
                    component={() => <HomePage />}
                  />
                  <Route
                    exact
                    path={URLS.EXPLORE}
                    component={() => <ExplorePage />}
                  />
                  <Route
                    exact
                    path={`${URLS.USER}/:userAddress`}
                    component={() => <ExplorePage />}
                  />
                  <Route
                    exact
                    path={`${URLS.EXPLORE}/:artAccountPubkey`}
                    component={() => <ArtPage />}
                  />
                  <Route
                    exact
                    path={URLS.PAGE_404}
                    component={() => <Page404 />}
                  />
                  <Route exact path={'*'} component={() => <Page404 />} />
                </Switch>
              </ArtDetailsProvider>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  )
}
