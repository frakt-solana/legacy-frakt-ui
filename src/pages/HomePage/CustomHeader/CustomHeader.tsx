import React, { FC } from 'react';
import styles from './styles.module.scss';
import { HashLink as AnchorLink } from 'react-router-hash-link';
import { ROADMAP_SECTION_ID } from '../constants';

export const CustomHeader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={`${styles.container} container`}>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ROADMAP_SECTION_ID}`}>
            What is FRAKT?
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ROADMAP_SECTION_ID}`}>
            Ecosystem
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ROADMAP_SECTION_ID}`}>
            Team
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ROADMAP_SECTION_ID}`}>
            FAQ
          </AnchorLink>
        </li>
        <li className={styles.item}>
          <AnchorLink smooth to={`#${ROADMAP_SECTION_ID}`}>
            Contact us
          </AnchorLink>
        </li>
      </ul>
    </div>
  );
};
