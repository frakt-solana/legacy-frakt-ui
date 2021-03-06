import React, { FC } from 'react';
import styles from './styles.module.scss';
import CompanyLogo from '../../CompanyLogo';
import BurgerMenu from '../../BurgerMenu';
import ConnectButton from '../../ConnectButton';
import AppNavigation from '../../AppNavigation';
import ConnectedButton from '../../ConnectedButton/ConnectedButton';
import classNames from 'classnames';

interface HeaderProps {
  className?: string;
  connected: boolean;
  visible: boolean;
  CustomHeader?: FC;
}

export const Header: FC<HeaderProps> = ({
  connected,
  CustomHeader,
  className,
}) => {
  return (
    <div
      className={classNames(styles.header, className, {
        [styles.hasCustomHeader]: CustomHeader,
      })}
    >
      <div className={`${styles.container} container`}>
        <div className={styles.logoWrapper}>
          <CompanyLogo />
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
        <BurgerMenu className={styles.burgerMenu} />
      </div>
      {CustomHeader && <CustomHeader />}
    </div>
  );
};
