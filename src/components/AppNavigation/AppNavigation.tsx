import React from 'react';

import { PATHS } from '../../constants';
import styles from './styles.module.scss';
import { NavigationLink } from './NavigationLink';
interface AppNavigation {
  className?: string;
}

const AppNavigation = ({ className }: AppNavigation): JSX.Element => {
  return (
    <ul className={`${styles.root} ${className || ''}`}>
      <NavigationLink to={PATHS.COLLECTION} text="Collection" />
      <NavigationLink to={PATHS.RARITY} text="Rarity hdbk" />
      <NavigationLink to={PATHS.STAKE} text="Staking" />
      <NavigationLink to={PATHS.MARKETPLACE} text="Marketplace" />
      <li>
        <a className={styles.link} href={process.env.REACT_APP_SANDBOX_URL}>
          Sandbox
        </a>
      </li>
      <li>
        <a className={styles.link} href={process.env.REACT_APP_FRAKTION_URL}>
          Fraktion
        </a>
      </li>
    </ul>
  );
};

export default AppNavigation;
