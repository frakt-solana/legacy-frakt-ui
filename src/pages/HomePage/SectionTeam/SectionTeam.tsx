import React, { FC } from 'react';
import styles from './styles.module.scss';
import teamPhotoTim from '../assets/images/team/teamPhotoTim.jpg';
import { TwitterIcon } from '../../../icons/TwitterIcon';
import teamPhotoVedamir from '../assets/images/team/teamPhotoVedamire.jpg';
import { GitHubIcon } from '../../../icons/GitHubIcon';
import teamPhotoVlad from '../assets/images/team/teamPhotoVlad.jpg';
import teamPhotoPhil from '../assets/images/team/teamPhotoPhil.jpg';
import teamPhotoViktor from '../assets/images/team/teamPhotoViktor.jpg';
import teamPhotoRoman from '../assets/images/team/teamPhotoRoman.jpg';
import teamPhotoAdrian from '../assets/images/team/teamPhotoAdrian.jpg';
import teamPhotoEgor from '../assets/images/team/teamPhotoEgor.jpg';
import teamPhotoVlad2 from '../assets/images/team/teamPhotoVlad2.jpeg';
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
            <div className={styles.teamPhotoWrapper}>
              <img src={teamPhotoTim} alt="Tim" className={styles.teamPhoto} />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Tim</p>
              <div className={styles.teamPosition}>
                <span>Founder</span>
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
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoVedamir}
                alt="Vedamir"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Vedamir</p>
              <div className={styles.teamPosition}>
                <span>
                  Co-founder, <br /> DeFi Magician
                </span>
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
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoVlad}
                alt="Vlad"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Vlad</p>
              <div className={styles.teamPosition}>
                <span>
                  Co-founder, <br /> UX Lead
                </span>
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
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoPhil}
                alt="Phil"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Phil</p>
              <div className={styles.teamPosition}>
                <span>
                  Operations, <br /> Community
                </span>
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
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoViktor}
                alt="Viktor"
                className={styles.teamPhoto}
              />
            </div>
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
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoRoman}
                alt="Roman"
                className={styles.teamPhoto}
              />
            </div>
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
          <li className={styles.teamItem}>
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoAdrian}
                alt="Adrian"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Adrian</p>
              <div className={styles.teamPosition}>
                <span>Community</span>
                <a
                  href="https://twitter.com/0x1dad"
                  rel="noreferrer"
                  target="_blank"
                >
                  <TwitterIcon width={24} />
                </a>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoEgor}
                alt="Egor"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Egor</p>
              <div className={styles.teamPosition}>
                <span>UX/UI designer</span>
              </div>
            </div>
          </li>
          <li className={styles.teamItem}>
            <div className={styles.teamPhotoWrapper}>
              <img
                src={teamPhotoVlad2}
                alt="Vlad"
                className={styles.teamPhoto}
              />
            </div>
            <div className={styles.teamInfo}>
              <p className={styles.teamName}>Vlad</p>
              <div className={styles.teamPosition}>
                <span>Developer</span>
                <a
                  href="https://github.com/ezekiel9218"
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
