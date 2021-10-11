import React from 'react';

import { useWallet } from '../../external/contexts/wallet';
import Button from '../Button';

export interface ConnectButtonProps {
  className?: string;
}

const ConnectButton = ({ className }: ConnectButtonProps): JSX.Element => {
  const { select } = useWallet();

  return (
    <Button className={className} size="lg" onClick={select}>
      Connect wallet
    </Button>
  );
};

export default ConnectButton;
