import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Helmet } from 'react-helmet';
import { FRAKT_SVG_IMAGE } from '../FraktSvgImage';

export const SectionHeader: FC = () => {
  return (
    <section className={styles.firstSectionBg}>
      <div className="container">
        <Helmet>
          <title>FRAKT | A NFT-DeFi ecosystem on Solana</title>
        </Helmet>
        <div className={styles.hero}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.mainTitle}>A NFT-DeFi ecosystem on Solana</h1>
            <div className={styles.subtitleWrapper}>
              <p className={styles.subtitle}>
                For NFT collectors, investors and creators
              </p>
            </div>
          </div>
          <div className={styles.hero__bg}>
            <FRAKT_SVG_IMAGE />
          </div>
        </div>
      </div>
    </section>
  );
};
