import React, { useEffect } from 'react';
import styles from './styles.module.scss';

import CompanyLogo from '../CompanyLogo';
import AppNavigation from '../AppNavigation';
import ConnectButton from '../ConnectButton';
import BurgerMenu from '../BurgerMenu';
import AppFooter from '../AppFooter';
import CurrentUserTable from '../CurrentUserTable';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletContent from '../WalletContent';
import { useLocation } from 'react-router-dom';
import { useWalletModal } from '../../contexts/walletModal';
import { Header } from './Header';

interface AppLayoutProps {
  CustomHeader?: React.FunctionComponent;
  headerText?: string;
  children: any;
  className?: string;
  mainClassName?: string;
}

const AppLayout = ({
  CustomHeader,
  headerText,
  children,
  className,
  mainClassName,
}: AppLayoutProps): JSX.Element => {
  const { connected } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const location = useLocation();

  useEffect(() => {
    visible && setVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <Header visible={visible} connected={connected} />
      <div className={`${styles.main} ${mainClassName || ''}`} id="mainContent">
        {visible && <WalletContent />}
        {CustomHeader && <CustomHeader />}
        {headerText && <div className={styles.header}>{headerText}</div>}
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
