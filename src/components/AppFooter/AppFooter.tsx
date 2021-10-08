import React from 'react';

import {
  DiscordIcon,
  TwitterIcon,
  GitHubIcon,
  TelegramIcon,
} from '../../icons';
import styles from './styles.module.scss';
import { LinkItem } from './LinkItem';

import {
  DISCORD_LINK,
  TWITTER_LINK,
  TELEGRAM_LINK,
  GITHUB_LINK,
} from './constants';

interface AppFooterProps {
  className?: string;
}

const AppFooter = ({ className }: AppFooterProps): JSX.Element => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ul className={styles.icons}>
        <LinkItem url={DISCORD_LINK} Icon={DiscordIcon} />
        <LinkItem url={TWITTER_LINK} Icon={TwitterIcon} />
        {/* <LinkItem url={TELEGRAM_LINK} Icon={TelegramIcon} /> */}
        <LinkItem url={GITHUB_LINK} Icon={GitHubIcon} />
      </ul>
    </div>
  );
};

export default AppFooter;
