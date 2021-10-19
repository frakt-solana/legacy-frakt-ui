import React from 'react';

import { URLS } from '../../constants';
import styles from './styles.module.scss';
import { NavigationLink } from './NavigationLink';
import { useWallet } from '../../external/contexts/wallet';

interface AppNavigation {
  className?: string;
}

const AppNavigation = ({ className }: AppNavigation): JSX.Element => {
  const { connected, select } = useWallet();

  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <NavigationLink to={URLS.COLLECTION} text="Collection" />
      <NavigationLink to={URLS.RARITY} text="Rarity hdbk" />
      <NavigationLink
        to={URLS.STAKING}
        text="Staking"
        notLink={!connected}
        onClick={select}
      />
      <NavigationLink to={URLS.MARKETPLACE} text="Marketplace" />
      <li>
        <a className={styles.link} href={URLS.LAUNCHPAD}>
          Launchpad
        </a>
      </li>
      <li>
        <a className={styles.link} href={URLS.SANDBOX}>
          Sandbox
        </a>
      </li>
    </ul>
  );
};

export default AppNavigation;
