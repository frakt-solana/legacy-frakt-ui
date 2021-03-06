import React, { FC } from 'react';
import styles from './styles.module.scss';
import rainbowWaveImage from '../assets/images/rainbowWave.jpg';
import { WHAT_IS_FRAKT_SECTION_ID } from '../constants';

export const SectionWhatIsFrakt: FC<{
  navRef: { current: HTMLParagraphElement };
}> = ({ navRef }) => {
  return (
    <section className={`section ${styles.whatIsFrakt}`}>
      <p
        className={`itemForIntersectionMenu ${styles.navAnchor}`}
        id={WHAT_IS_FRAKT_SECTION_ID}
        ref={navRef}
      >
        What is FRAKT?
      </p>
      <div className={`container ${styles.whatContainer}`}>
        <div className={styles.whatImgWrapper}>
          <img
            src={rainbowWaveImage}
            alt="Rainbow Wave"
            className={styles.rainbowImg}
          />
        </div>
        <div className={styles.whatInfo}>
          <h2 className={styles.whatTitle}>What is FRAKT?</h2>
          <p className={styles.whatSubtitle}>
            First generative art project with a full ecosystem of its own
          </p>
          <p className={styles.whatText}>
            FRAKT is dedicated to pushing the Solana DeFi and NFT ecosystems
            forward, and beyond. We are focused on leading the way in terms of
            innovative community-driven projects aiming at providing qualitative
            tools and products enabling all Solana projects to grow and thrive.
          </p>
        </div>
      </div>
    </section>
  );
};
