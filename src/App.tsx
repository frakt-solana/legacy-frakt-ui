import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';

import { StakingProvider } from './contexts/staking';
import { FraktsProvider } from './contexts/frakts';
import { FrktBalanceProvider } from './contexts/frktBalance';
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
import { Router } from './router';

const wallets = [
  getPhantomWallet(),
  getSolflareWallet(),
  getLedgerWallet(),
  getSolletWallet({ network: NETWORK as WalletAdapterNetwork }),
  getSolletExtensionWallet({ network: NETWORK as WalletAdapterNetwork }),
];

export default function App(): JSX.Element {
  return (
    <WalletModalProvider>
      <ConnectionProvider endpoint={ENDPOINT}>
        <WalletProvider wallets={wallets} autoConnect>
          <FrktBalanceProvider>
            <FraktsProvider>
              <StakingFrktProvider>
                <StakingProvider>
                  <Router />
                </StakingProvider>
              </StakingFrktProvider>
            </FraktsProvider>
          </FrktBalanceProvider>
        </WalletProvider>
      </ConnectionProvider>
    </WalletModalProvider>
  );
}
