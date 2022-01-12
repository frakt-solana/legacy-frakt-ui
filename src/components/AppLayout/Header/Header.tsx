import React, { FC } from 'react';
import styles from './styles.module.scss';
import CompanyLogo from '../../CompanyLogo';
import BurgerMenu from '../../BurgerMenu';
import CurrentUserTable from '../../CurrentUserTable';
import ConnectButton from '../../ConnectButton';
import AppNavigation from '../../AppNavigation';

interface HeaderProps {
  connected: boolean;
  visible: boolean;
}

export const Header: FC<HeaderProps> = ({ connected, visible }) => {
  return (
    <div className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.logoWrapper}>
          <CompanyLogo />
          <BurgerMenu className={styles.burgerMenu} />
        </div>
        <div className={styles.navigationWrapper}>
          <AppNavigation />
        </div>
        <div className={styles.profileWrapper}>
          {connected ? (
            <CurrentUserTable className={styles.currentUserTable} />
          ) : (
            <ConnectButton className={styles.walletBtn} />
          )}
        </div>
      </div>
    </div>
  );
};
