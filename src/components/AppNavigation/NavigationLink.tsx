import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

interface NavigationLink {
  to: string;
  text: string;
  notLink?: boolean;
  onClick?: () => void;
}

export const NavigationLink = ({
  to,
  text,
  notLink,
  onClick,
}: NavigationLink): JSX.Element => (
  <li>
    {!notLink ? (
      <NavLink
        className={styles.link}
        activeClassName={styles.activeLink}
        to={to}
      >
        {text}
      </NavLink>
    ) : (
      <p className={styles.link} onClick={onClick}>
        {text}
      </p>
    )}
  </li>
);
