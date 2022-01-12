import React, { FC } from 'react';
import styles from './styles.module.scss';
import CompanyLogo from '../../CompanyLogo';
import BurgerMenu from '../../BurgerMenu';
import ConnectButton from '../../ConnectButton';
import AppNavigation from '../../AppNavigation';
import ConnectedButton from '../../ConnectedButton/ConnectedButton';
import classNames from 'classnames';

interface HeaderProps {
  connected: boolean;
  visible: boolean;
  CustomHeader?: FC;
}

export const Header: FC<HeaderProps> = ({ connected, CustomHeader = null }) => {
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
            <ConnectedButton
              className={classNames(
                styles.walletBtn,
                styles.walletConnectedBtn,
              )}
            />
          ) : (
            <ConnectButton className={styles.walletBtn} />
          )}
        </div>
      </div>
      {CustomHeader && <CustomHeader />}
    </div>
  );
};
