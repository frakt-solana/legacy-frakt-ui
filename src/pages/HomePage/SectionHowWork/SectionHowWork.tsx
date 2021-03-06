import React, { FC } from 'react';
import styles from './styles.module.scss';
import howWorkImage from '../assets/images/fraktEcosystem.svg';

export const SectionHowWork: FC = () => {
  return (
    <section className={`section ${styles.howWork}`}>
      <div className={`container ${styles.howWorkContainer}`}>
        <h2 className={styles.howWorkTitle}>How does it all work together?</h2>
        {/*<div className={styles.buttonsWrapper}>
          <NavLink to={'/'} className={styles.howWorkLink}>
            BUY & STAKE FRAKTS
          </NavLink>
          <NavLink to={'/'} className={styles.howWorkLink}>
            BUY & STAKE $FRKT
          </NavLink>
        </div>*/}
        <img
          src={howWorkImage}
          alt="FRAKT Ecosystem"
          className={styles.howWorkImage}
        />
      </div>
    </section>
  );
};
