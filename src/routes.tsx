import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { WalletProvider } from './contexts/wallet'
import { ConnectionProvider } from './contexts/connection'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'

import { URLS } from './constants'

import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import MyFractsPage from './pages/MyFractsPage'
import { ArtDetailsProvider } from './contexts/artDetails'
import ArtPage from './pages/ArtPage'

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
                    path={URLS.MY_FACTS}
                    component={() => <MyFractsPage />}
                  />
                  <Route exact path={`/:id`} component={() => <ArtPage />} />
                </Switch>
              </ArtDetailsProvider>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  )
}
