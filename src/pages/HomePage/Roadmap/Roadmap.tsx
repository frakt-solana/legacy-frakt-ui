import React from 'react'

import styles from './styles.module.scss'

const STEPS = [
  {
    title: 'Launchpad',
    description:
      'We are working with other projects in the Solana ecosystem to provide incentives for Frakt holders.',
    checked: true,
    link: 'https://launchpd.frakt.art/',
  },
  {
    title: 'Staking',
    description:
      'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
    checked: false,
  },
  {
    title: 'DAO',
    description:
      'We are working with other projects in the Solana ecosystem to provide incentives for Frakt holders.',
    checked: false,
  },
  {
    title: 'Fraktionaize',
    description:
      'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
    checked: false,
  },
  {
    title: 'Multichain bridge',
    description:
      'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
    checked: false,
  },
  {
    title: 'VPF oracle',
    description:
      'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
    checked: false,
  },
]

const Roadmap = () => (
  <div className={styles.root}>
    {STEPS.map(({ title, description, checked, link }, idx) => (
      <div
        key={idx}
        className={`${styles.item} ${checked ? styles.item_checked : ''}`}
      >
        <div className={styles.item__content}>
          {link ? (
            <a
              href={link}
              rel='noopener noreferrer'
              target='_blank'
              className={styles.item__title}
            >
              {title}
            </a>
          ) : (
            <h3 className={styles.item__title}>{title}</h3>
          )}
          <p>{description}</p>
        </div>
      </div>
    ))}
  </div>
)

export default Roadmap
