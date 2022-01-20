import React, { FC } from 'react';
import styles from './styles.module.scss';
import teamPhotoTim from '../assets/images/team/teamPhotoTim.jpg';
import { TwitterIcon } from '../../../icons/TwitterIcon';
import teamPhotoVedamire from '../assets/images/team/teamPhotoVedamire.jpg';
import { GitHubIcon } from '../../../icons/GitHubIcon';
import teamPhotoVlad from '../assets/images/team/teamPhotoVlad.jpg';
import teamPhotoPhil from '../assets/images/team/teamPhotoPhil.jpg';
import teamPhotoViktor from '../assets/images/team/teamPhotoViktor.jpg';
import teamPhotoSid from '../assets/images/team/teamPhotoSid.jpg';
import teamPhotoRoman from '../assets/images/team/teamPhotoRoman.jpg';
import { TEAM_SECTION_ID } from '../constants';

export const SectionTeam: FC<{ navRef: { current: HTMLParagraphElement } }> = ({
  navRef,
}) => {
  return (
    <section id={TEAM_SECTION_ID} className={`section ${styles.team}`}>
      <p className="itemForIntersectionMenu" id={TEAM_SECTION_ID} ref={navRef}>
        Team
      </p>
      <div className={`container ${styles.teamContainer}`}>
        <h2 className={styles.teamTitle}>Meet the team</h2>
        <ul className={styles.teamList}>
          <li className={styles.teamItem}>
            <img src={teamPhotoTim} alt="Tim" className={styles.teamPhoto} />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Tim</p>
              <div className={styles.teamPosition}>
                <span>CEO</span>
                <a
                  href="https://twitter.com/timsamoylov"
                  rel="noreferrer"
                  target="_blank"
                >
                  <TwitterIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img
              src={teamPhotoVedamire}
              alt="Vedamire"
              className={styles.teamPhoto}
            />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Vedamire</p>
              <div className={styles.teamPosition}>
                <span>CTO</span>
                <a
                  href="https://github.com/vedamire"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img src={teamPhotoVlad} alt="Vlad" className={styles.teamPhoto} />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Vlad</p>
              <div className={styles.teamPosition}>
                <span>CDO, UX Lead</span>
                <a
                  href="https://github.com/sablevsky"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img src={teamPhotoPhil} alt="Phil" className={styles.teamPhoto} />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Phil</p>
              <div className={styles.teamPosition}>
                <span>COO</span>
                <a
                  href="https://twitter.com/rawrxbt"
                  rel="noreferrer"
                  target="_blank"
                >
                  <TwitterIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img
              src={teamPhotoViktor}
              alt="Viktor"
              className={styles.teamPhoto}
            />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Viktor</p>
              <div className={styles.teamPosition}>
                <span>Developer</span>
                <a
                  href="https://github.com/valpaq"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img src={teamPhotoSid} alt="Sid" className={styles.teamPhoto} />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Sid</p>
              <div className={styles.teamPosition}>
                <span>Art Director</span>
                <a
                  href="https://twitter.com/SiD_Phi11ips"
                  rel="noreferrer"
                  target="_blank"
                >
                  <TwitterIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <img
              src={teamPhotoRoman}
              alt="Roman"
              className={styles.teamPhoto}
            />
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Roman</p>
              <div className={styles.teamPosition}>
                <span>Developer</span>
                <a
                  href="https://github.com/Piterom911"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon width={24} />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
