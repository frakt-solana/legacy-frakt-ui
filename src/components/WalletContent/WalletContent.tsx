import React from 'react';
import ButtonArrow from '../ButtonArrow';
import styles from './styles.module.scss';
import { WalletItem } from './WalletItem';
import { useWalletModal } from '../../contexts/walletModal';
import { useWallet } from '@solana/wallet-adapter-react';

interface WalletContentProps {
  className?: string;
}

const WalletContent = ({ className = '' }: WalletContentProps): JSX.Element => {
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <div className={className}>
      <div className={styles.backButtonContainer}>
        <ButtonArrow
          size="lg"
          arrowLeft
          className={styles.backButton}
          onClick={() => setVisible(true)}
        >
          Back
        </ButtonArrow>
      </div>
      <div className={styles.title}>Select wallet</div>
      <div className={styles.itemsContainer}>
        {wallets.map(({ name, icon: iconUrl }, idx) => (
          <WalletItem
            key={idx}
            onClick={(): void => {
              select(name);
              setVisible(false);
            }}
            imageSrc={iconUrl}
            imageAlt={name}
            name={name}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletContent;
