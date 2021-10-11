import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import { URLS } from '../../constants';

interface CompanyLogoProps {
  className?: string;
}

const CompanyLogo = ({ className }: CompanyLogoProps): JSX.Element => {
  return (
    <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
      Frakt
    </NavLink>
  );
};

export default CompanyLogo;
