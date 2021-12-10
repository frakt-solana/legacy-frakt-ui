import styles from './styles.module.scss';

export const WarnBanner = (): JSX.Element => {
  return (
    <div className={styles.stakingPage__warnBanner}>
      According to{' '}
      <a
        href="https://docs.google.com/document/d/1m7qS2slSdHw0tTq-6HsPRCLVwrWDWi8hiZaJNRAQm1s"
        target="_blank"
        rel="noopener noreferrer"
      >
        tokenomics proposal
      </a>{' '}
      by DAO, we are going to implement the reducing of the NFTs staking
      rewards and allocate funds to single token staking and liquidity incentives treasuries. In order to prepare for this transition, we STRONGLY advise to
      harvest your funds before <b>Dec 17 Friday 4:00 PM UTC</b> to preserve your
      accumulated $FRKT.{' '}
      <b>
        All accumulated $FRKT that was earned but not harvested will be cut in
        half
      </b>
      .
    </div>
  );
};
