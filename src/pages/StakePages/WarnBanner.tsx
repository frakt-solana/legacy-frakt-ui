import styles from './styles.module.scss';

export const WarnBanner = (): JSX.Element => {
  return (
    <div className={styles.stakingPage__warnBanner}>
      According to{' '}
      <a
        href="https://docs.google.com/document/d/1XILdsPUEpPK9um98CF1lwUnf5uReTJ9XM_WKABO66_E"
        target="_blank"
        rel="noopener noreferrer"
      >
        tokenomics proposal
      </a>{' '}
      by communty, we are going to implement the halving of the $FRKT staking
      rewards. In order to prepare for this transition, we STRONGLY advise to
      harvest your funds before <b>Friday 4:00 PM UTC</b> to preserve your
      accumulated $FRKT. <b>All accumulated $FRKT that was earned but not harvested will be cut in half</b>.
    </div>
  );
};
