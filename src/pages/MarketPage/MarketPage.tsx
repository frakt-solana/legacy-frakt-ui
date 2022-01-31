import React from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { SwapIcon } from '../../icons';

const TRENDING_DATA = [
  { name: 'mask', percent: '45%' },
  { name: 'monkey', percent: '43%' },
  { name: 'punks', percent: '42%' },
  { name: 'yobidoyobi', percent: '40%' },
  { name: 'mask', percent: '38%' },
];

const ACTIVITY_DATA = [
  { name: 'meeb #565', type: 'sell' },
  { name: 'meeb #56577576', type: 'buy' },
  { name: 'meeb #565775762', type: 'buy' },
  { name: 'meeb #565775762', type: 'buy' },
  { name: 'BIG PUNK WITH Something', name2: 'meeb #56577556', type: 'swap' },
];

const shortName = (name: string) =>
  name.length > 15 ? `${name.slice(0, 13)} ...` : name;

const MarketPage = (): JSX.Element => (
  <AppLayout isLarge>
    <div className="container_lg">
      <Helmet>
        <title>{`Market | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarItem}>
            <h6 className={styles.sidebarTitle}>trending</h6>
            <span className={styles.sidebarSubtitle}>(7d turnover)</span>
            <ul className={styles.sidebarList}>
              {TRENDING_DATA.map((item, index) => (
                <li
                  className={styles.sidebarListItem}
                  key={item.name + item.percent}
                >
                  <span className={styles.sidebarItemNum}>{index + 1}</span>
                  <span className={styles.sidebarItemName}>{item.name}</span>
                  <span className={styles.sidebarItemData}>{item.percent}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarItem}>
            <h6 className={styles.sidebarTitle}>activity</h6>
            <ul className={styles.sidebarListBorder}>
              {ACTIVITY_DATA.map((item, index) => (
                <li
                  className={classNames(
                    styles.sidebarActivityListItem,
                    styles[item.type],
                  )}
                  key={item.name + item.type}
                >
                  {item.type === 'swap' ? (
                    <>
                      <div className={styles.swapItems}>
                        <span className={styles.sidebarItemName}>
                          {shortName(item.name)}
                        </span>
                        <SwapIcon />
                        <span className={styles.sidebarItemName}>
                          {shortName(item.name2)}
                        </span>
                      </div>
                      <span className={styles.typeLabel}>{item.type}</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.sidebarItemName}>
                        {shortName(item.name)}
                      </span>
                      <span className={styles.typeLabel}>{item.type}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Buy, sell, and swap NFTs instantly</h2>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default MarketPage;
