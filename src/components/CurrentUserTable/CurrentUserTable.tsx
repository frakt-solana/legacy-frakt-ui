import React from 'react';
import styles from './styles.module.scss';
import { useWallet } from '../../external/contexts/wallet';
import { formatNumber, shortenAddress } from '../../external/utils/utils';
import { useNativeAccount } from '../../external/contexts/accounts';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Table from '../Table';
import { DisconnectButton } from './DisconnectButton';

interface CurrentUserTableProps {
  className?: string;
}

const CurrentUserTable = ({
  className = '',
}: CurrentUserTableProps): JSX.Element => {
  const { wallet, disconnect } = useWallet();
  const { account } = useNativeAccount();

  if (!wallet?.publicKey) {
    return null;
  }

  const getBalanceValue = (): string =>
    `${formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL`;

  return (
    <div className={className}>
      <DisconnectButton onClick={disconnect} />
      <Table
        className={styles.table}
        data={[
          ['Address', shortenAddress(`${wallet.publicKey || ''}`)],
          ['Balance', getBalanceValue()],
        ]}
      />
    </div>
  );
};

export default CurrentUserTable;
