import React from 'react'

import styles from './styles.module.scss'

const STEPS = [
  {
    title: 'Launchpad',
    description:
      'We are aiming to bring more into Solana NFT space with our launchpad. It means only original collections, true art and high utility projects. No bots, refunds or failing mint websites',
    checked: true,
    link: 'https://launchpd.frakt.art/',
  },
  {
    title: 'Staking',
    description:
      'To power up all upcoming projects you will be able to stake your frakts and recieve voting power in DAO, airdrops, launchpad lottery tickets and yield from fraktionalizer fee and collection royalties',
    checked: false,
  },
  {
    title: 'DAO',
    description:
      'To make our project more community-driven stakers will be able to vote for upcoming projects on launchpad and key decisions on next steps',
    checked: false,
  },
  {
    title: 'Fraktionalizer',
    description:
      "As a one of first builders in Solana NFT space we aim to grow it's ecosystem even further with platform that allows you to fraction your NFT and trade fractions on DEX and AMM. A part of governance fee will be distributed to frakts stakers",
    checked: false,
  },
  // {
  //   title: 'Multichain bridge',
  //   description:
  //     'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
  //   checked: false,
  // },
  // {
  //   title: 'VPF oracle',
  //   description:
  //     'We plan to build a Verified Random Function on Solana. The chain currently does not have such a function, but will be necessary for gaming, gambling and other NFT projects that require an independent random function.',
  //   checked: false,
  // },
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
