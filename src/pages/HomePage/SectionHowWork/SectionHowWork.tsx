import React, { FC } from 'react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import howWorkImage from '../assets/images/howWork.jpg';

export const SectionHowWork: FC = () => {
  return (
    <section className={`section ${styles.howWork}`}>
      <div className={`container ${styles.howWorkContainer}`}>
        <h2 className={styles.howWorkTitle}>How does it all work together?</h2>
        <div className={styles.howWorkButton}>
          <NavLink to={'/'} className={styles.howWorkLink}>
            BUY & STAKE FRAKTS
          </NavLink>
          <NavLink to={'/'} className={styles.howWorkLink}>
            BUY & STAKE$FRKT
          </NavLink>
        </div>
        <h4 className={styles.howWorkSubtitle}>FRAKT ECOSYSTEM</h4>
        <img
          src={howWorkImage}
          alt="FRAKT Ecosystem"
          className={styles.howWorkImage}
        />
      </div>
    </section>
  );
};
