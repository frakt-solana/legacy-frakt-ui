import React from 'react'
import { GitHubIcon, TelegramIcon, TwitterIcon } from '../icons'
import styles from './AppFooter.module.scss'

const AppFooter = (props: any) => {
  return (
    <div className={styles.root}>
      <ul className={styles.hashtags}>
        <li>#HashTag1</li>
        <li>#HashTag2</li>
        <li>#HashTag3</li>
      </ul>
      <ul className={styles.icons}>
        <li>
          <GitHubIcon size={32} />
        </li>
        <li>
          <TwitterIcon size={32} />
        </li>
        <li>
          <TelegramIcon size={32} />
        </li>
      </ul>
    </div>
  )
}

export default AppFooter
