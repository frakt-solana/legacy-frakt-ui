import React from 'react';
import Button from '../Button';
import { useWalletModal } from '../../contexts/walletModal';

export interface ConnectButtonProps {
  className?: string;
}

const ConnectButton = ({ className }: ConnectButtonProps): JSX.Element => {
  const { setVisible } = useWalletModal();

  return (
    <Button
      className={className}
      size="lg"
      onClick={() => {
        setVisible(true);
      }}
    >
      Connect wallet
    </Button>
  );
};

export default ConnectButton;
