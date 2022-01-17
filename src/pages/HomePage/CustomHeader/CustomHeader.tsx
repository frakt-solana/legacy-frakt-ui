import React, { FC } from 'react';
import styles from './styles.module.scss';
import { HashLink as AnchorLink } from 'react-router-hash-link';
import {
  CONTACT_SECTION_ID,
  ECOSYSTEM_SECTION_ID,
  FAQ_SECTION_ID,
  TEAM_SECTION_ID,
  WHAT_IS_FRAKT_SECTION_ID,
} from '../constants';

export const CustomHeader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={`${styles.container} container`}>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${WHAT_IS_FRAKT_SECTION_ID}`}>
            What is FRAKT?
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ECOSYSTEM_SECTION_ID}`}>
            Ecosystem
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${TEAM_SECTION_ID}`}>
            Team
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${FAQ_SECTION_ID}`}>
            FAQ
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${CONTACT_SECTION_ID}`}>
            Contact us
          </AnchorLink>
        </li>
      </ul>
    </div>
  );
};
