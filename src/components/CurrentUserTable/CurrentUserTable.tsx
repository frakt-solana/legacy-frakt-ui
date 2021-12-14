import React from 'react';

import styles from './styles.module.scss';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Table from '../Table';
import { DisconnectButton } from './DisconnectButton';
import { useFrktBalance } from '../../contexts/frktBalance';
import { frktBNToString } from '../../utils';
import { useNativeAccount } from '../../hooks/useNativeAccount';
import { formatNumber, shortenAddress } from '../../utils/solanaUtils';

interface CurrentUserTableProps {
  className?: string;
}

const CurrentUserTable = ({
  className = '',
}: CurrentUserTableProps): JSX.Element => {
  const { disconnect, publicKey } = useWallet();
  const { balance } = useFrktBalance();
  const { account } = useNativeAccount();

  if (!publicKey) {
    return null;
  }

  const getBalanceValue = (): string =>
    `${formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL`;

  const getFrktBalanceValue = (): string => {
    const frktBalance = balance ? frktBNToString(balance, 2) : '0';
    return `${frktBalance !== '0' ? frktBalance : '--'} FRKT`;
  };

  return (
    <div className={className}>
      <DisconnectButton onClick={disconnect} />
      <Table
        className={styles.table}
        data={[
          ['Address', shortenAddress(`${publicKey || ''}`)],
          ['Balance', getBalanceValue()],
          ['Tokens', getFrktBalanceValue()],
        ]}
      />
    </div>
  );
};

export default CurrentUserTable;
