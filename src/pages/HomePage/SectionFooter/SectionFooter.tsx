import React, { FC } from 'react';
import styles from './styles.module.scss';
import { FooterSvgLogo } from '../FooterSvgLogo';
import { PATHS } from '../../../constants';
import { HashLink as AnchorLink } from 'react-router-hash-link';
import {
  ECOSYSTEM_SECTION_ID,
  FAQ_SECTION_ID,
  TEAM_SECTION_ID,
  WHAT_IS_FRAKT_SECTION_ID,
} from '../constants';
import {
  ArrowRightTop,
  DiscordIcon,
  GitHubIcon,
  TwitterIcon,
} from '../../../icons';
import { NavLink } from 'react-router-dom';

export const SectionFooter: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoWrapper}>
          <FooterSvgLogo />
        </div>
        <div className={styles.footerNavs}>
          <div className={styles.navWrapper}>
            <h5 className={styles.navTitle}>Ecosystem</h5>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink to={PATHS.COLLECTION}>Collection</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to={PATHS.RARITY}>Rarity hdbk</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to={PATHS.STAKE}>Staking</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to={PATHS.MARKETPLACE}>Marketplace</NavLink>
              </li>
              <li className={styles.navItem}>
                <a
                  className={styles.link}
                  href={process.env.REACT_APP_SANDBOX_URL}
                >
                  Sandbox
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  className={styles.link}
                  href={process.env.REACT_APP_FRAKTION_URL}
                >
                  Fraktion
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.navWrapper}>
            <h5 className={styles.navTitle}>FRAKT</h5>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <AnchorLink smooth to={`#${WHAT_IS_FRAKT_SECTION_ID}`}>
                  What is FRAKT?
                </AnchorLink>
              </li>
              <li className={styles.navItem}>
                <AnchorLink smooth to={`#${ECOSYSTEM_SECTION_ID}`}>
                  Ecosystem
                </AnchorLink>
              </li>
              <li className={styles.navItem}>
                <AnchorLink smooth to={`#${TEAM_SECTION_ID}`}>
                  Team
                </AnchorLink>
              </li>
              <li className={styles.navItem}>
                <AnchorLink smooth to={`#${FAQ_SECTION_ID}`}>
                  FAQ
                </AnchorLink>
              </li>
            </ul>
          </div>
          <div className={styles.contacts}>
            <h5 className={styles.navTitle}>Contact us</h5>
            <a href="mailto:hello@frakt.art" className={styles.mailAddress}>
              hello@frakt.art <ArrowRightTop />
            </a>
            <ul className={styles.socialNavs}>
              <li className={styles.socialItem}>
                <a
                  href="http://discord.gg/frakt"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DiscordIcon />
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://twitter.com/FraktArt"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://github.com/frakt-solana"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
