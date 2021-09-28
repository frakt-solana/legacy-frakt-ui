import React, { useEffect } from 'react';
import styles from './styles.module.scss';

import CompanyLogo from '../CompanyLogo';
import AppNavigation from '../AppNavigation';
import ConnectButton from '../ConnectButton';
import BurgerMenu from '../BurgerMenu';
import AppFooter from '../AppFooter';
import CurrentUserTable from '../CurrentUserTable';
import { useWallet } from '../../external/contexts/wallet';
import WalletContent from '../WalletContent';
import { useLocation } from 'react-router-dom';

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
  const { connected, isModalVisible, closeModal } = useWallet();
  const location = useLocation();

  useEffect(() => {
    isModalVisible && closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.sideBar}>
        <div className={styles.logoWrapper}>
          <CompanyLogo />
          <BurgerMenu className={styles.burgerMenu} />
        </div>
        <div className={styles.profileWrapper}>
          {connected ? (
            <CurrentUserTable />
          ) : isModalVisible ? null : (
            <ConnectButton />
          )}
        </div>
        <div className={styles.navigationWrapper}>
          <AppNavigation />
          <AppFooter className={styles.footer} />
        </div>
      </div>
      <div className={`${styles.main} ${mainClassName || ''}`} id="mainContent">
        {isModalVisible ? (
          <WalletContent />
        ) : (
          <>
            {CustomHeader && <CustomHeader />}
            {headerText && <div className={styles.header}>{headerText}</div>}
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
