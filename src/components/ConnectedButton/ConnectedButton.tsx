import React from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import { useWalletModal } from '../../contexts/walletModal';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '../../utils/solanaUtils';
import { ArrowDownBtn } from '../../icons';

export interface ConnectButtonProps {
  className?: string;
}

const ConnectedButton = ({ className }: ConnectButtonProps): JSX.Element => {
  const { visible, setVisible } = useWalletModal();
  const { publicKey: walletPubKey } = useWallet();

  return (
    <Button
      className={className}
      onClick={() => {
        setVisible(!visible);
      }}
    >
      {shortenAddress(walletPubKey.toString())}
      <ArrowDownBtn className={styles.arrowDownIcon} />
    </Button>
  );
};

export default ConnectedButton;
