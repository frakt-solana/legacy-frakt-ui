import React from 'react'
import { GitHubIcon, TelegramIcon } from '../icons'
import styles from './AppFooter.module.scss'

const GITHUB_LINK = 'https://github.com/frakt-solana'
const TELEGRAM_LINK = 'https://telegram.org/'

const AppFooter = ({ className }: any) => {
  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ul className={styles.icons}>
        <li>
          <a href={GITHUB_LINK} target='_blank' rel='noopener noreferrer'>
            <GitHubIcon size={32} />
          </a>
        </li>
        <li>
          <a href={TELEGRAM_LINK} target='_blank' rel='noopener noreferrer'>
            <TelegramIcon size={32} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AppFooter
