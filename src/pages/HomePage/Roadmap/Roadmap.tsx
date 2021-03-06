import { NavLink } from 'react-router-dom';
import { PATHS } from '../../../constants';
import styles from './styles.module.scss';

const STEPS = [
  {
    title: 'Staking',
    description:
      "Here's your chance to get involved with the FRAKT ecosystem. Stake your frakts and you will be eligible to vote in the FRAKT DAO, receive exclusive airdrops, access Launchpad lottery tickets, and earn yields from collection royalties and fraktionalizer fees",
    checked: true,
    link: { external: false, url: PATHS.STAKING_NFT },
  },
  {
    title: 'Sandbox',
    description:
      'Sandbox is a platform to spotlight individual artists, incentivize staking and give utility to $FRKT. Every kurated collection launching on platform can be minted only with $FRKT. We provide guidance and curate every single project, help with exposure and technical execution of the launch.',
    checked: true,
    link: { external: true, url: 'https://sandbox.frakt.art/' },
  },
  {
    title: 'DAO',
    description:
      'You, our community, are our main focus. To be even more community-oriented, stakers will be able to vote for upcoming projects on the launchpad and will be able to take part in key future decisions',
    checked: false,
  },
  {
    title: 'Fraktionalizer',
    description:
      'As one of the first builders in the Solana NFT space, we aim to grow its ecosystem even further with a platform to split NFTs and trade fractions on a DEX and AMM. Stakers earn a portion of fees generated',
    checked: true,
    link: { external: true, url: 'https://fraktion.art/' },
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
];

const Roadmap = (): JSX.Element => (
  <div className={styles.root}>
    {STEPS.map(({ title, description, checked, link }, idx) => (
      <div
        key={idx}
        className={`${styles.item} ${checked ? styles.item_checked : ''}`}
      >
        <div className={styles.item__content}>
          {link ? (
            link.external ? (
              <a
                href={link.url}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.item__title}
              >
                {title}
              </a>
            ) : (
              <NavLink to={link.url} className={styles.item__title}>
                {title}
              </NavLink>
            )
          ) : (
            <h3 className={styles.item__title}>{title}</h3>
          )}
          <p>{description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Roadmap;
