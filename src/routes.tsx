import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { WalletProvider } from './contexts/wallet'
import { ConnectionProvider } from './contexts/connection'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'

import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import MyFractsPage from './pages/MyFractsPage'

export function Routes() {
  return (
    <Router>
      <ConnectionProvider>
        <WalletProvider>
          <AccountsProvider>
            <MarketProvider>
              <Switch>
                <Route exact path='/' component={() => <HomePage />} />
                <Route
                  exact
                  path='/explore'
                  component={() => <ExplorePage />}
                />
                <Route
                  exact
                  path='/myfracts'
                  component={() => <MyFractsPage />}
                />
              </Switch>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  )
}
