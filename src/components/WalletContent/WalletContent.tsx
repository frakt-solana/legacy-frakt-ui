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
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={() => setVisible(false)} />
      <div className={`${styles.container} container`}>
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
    </div>
  );
};

export default WalletContent;
