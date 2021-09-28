import React from 'react';

import { URLS } from '../../constants';
import styles from './styles.module.scss';
import { NavigationLink } from './NavigationLink';

interface AppNavigation {
  className?: string;
}

const AppNavigation = ({ className }: AppNavigation): JSX.Element => {
  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <NavigationLink to={URLS.COLLECTION} text="Collection" />
      <NavigationLink to={URLS.RARITY} text="Rarity hdbk" />
      <NavigationLink to={URLS.MARKETPLACE} text="Marketplace" />
      <li>
        <a className={styles.link} href={URLS.LAUNCHPAD}>
          Launchpad
        </a>
      </li>
    </ul>
  );
};

export default AppNavigation;
