import { HashRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { WalletProvider } from './contexts/wallet'
import { ConnectionProvider } from './contexts/connection'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'
// import { AppLayout } from "./components/Layout";
import AppLayout from './components/AppLayout'

// import { FaucetView, HomeView } from "./views";

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <Switch>
                  <Route exact path='/' component={() => <AppLayout />} />
                  {/* <Route exact path="/" component={() => <HomeView />} />
                      <Route exact path="/faucet" children={<FaucetView />} /> */}
                </Switch>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </HashRouter>
    </>
  )
}
