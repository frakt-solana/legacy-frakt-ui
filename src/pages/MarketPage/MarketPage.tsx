import React from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {
  ArrowDownSmallIcon,
  ArrowRightTop,
  SolanaIcon,
  SwapIcon,
} from '../../icons';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ControlledSelect } from '../../components/Select/Select';
import { useForm } from 'react-hook-form';

import tempImage from '../../images/examples/collectionCingular.png';

const POOLS_DATA = [
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
  {
    poolImage: tempImage,
    collectionsAmount: 123,
    itemsAmount: 123124,
    tokenName: 'PUNKS',
    tokenImage: tempImage,
    price: '0.000',
  },
];

const SORT_VALUES = [
  {
    label: (
      <span className={styles.sortName}>
        Name <ArrowDownSmallIcon className={styles.arrowDown} />
      </span>
    ),
    value: 'collectionName_asc',
  },
  {
    label: (
      <span className={styles.sortName}>
        Name <ArrowDownSmallIcon className={styles.arrowUp} />
      </span>
    ),
    value: 'collectionName_desc',
  },
];

const TRENDING_DATA = [
  { name: 'mask', percent: '45%' },
  { name: 'monkey', percent: '43%' },
  { name: 'punks', percent: '42%' },
  { name: 'yobidoyobi', percent: '40%' },
  { name: 'mask', percent: '38%' },
];

const BEST_APRS_DATA = [
  { name: 'mask', percent: '1 324.00%', image: '#' },
  { name: 'mask', percent: '1 324.00%', image: '#' },
  { name: 'mask', percent: '1 324.00%', image: '#' },
  { name: 'mask', percent: '1 324.00%', image: '#' },
  { name: 'safdfsd', percent: '1 324.00%', image: '#' },
];

const ACTIVITY_DATA = [
  { name: 'meeb #565', type: 'sell' },
  { name: 'meeb #56577576', type: 'buy' },
  { name: 'meeb #565775762', type: 'buy' },
  { name: 'meeb #565775762', type: 'buy' },
  { name: 'BIG PUNK WITH Something', name2: 'meeb #56577556', type: 'swap' },
];

const shortName = (name: string, maxLength: number) =>
  name.length > maxLength ? `${name.slice(0, maxLength - 2)} ...` : name;

const MarketPage = (): JSX.Element => {
  const { control, watch } = useForm({
    defaultValues: {
      sort: SORT_VALUES[0],
    },
  });

  const sort = watch('sort');

  return (
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
                    <span className={styles.sidebarItemData}>
                      {item.percent}
                    </span>
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
                            {shortName(item.name, 15)}
                          </span>
                          <SwapIcon />
                          <span className={styles.sidebarItemName}>
                            {shortName(item.name2, 15)}
                          </span>
                        </div>
                        <span className={styles.typeLabel}>{item.type}</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.sidebarItemName}>
                          {shortName(item.name, 15)}
                        </span>
                        <span className={styles.typeLabel}>{item.type}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <NavLink to={`/`} className={styles.seeMoreLink}>
                See More <ArrowRightTop />
              </NavLink>
            </div>

            <div className={styles.sidebarItem}>
              <h6 className={styles.sidebarTitle}>
                best apr<span>s</span>
              </h6>
              <ul className={styles.sidebarList}>
                {BEST_APRS_DATA.map((item, index) => (
                  <li
                    className={styles.sidebarListItem}
                    key={item.name + item.percent}
                  >
                    <div
                      className={styles.sidebarItemImg}
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <span className={styles.sidebarItemName}>{item.name}</span>
                    <span className={styles.sidebarItemData}>
                      {item.percent}
                    </span>
                  </li>
                ))}
              </ul>
              <NavLink to={`/`} className={styles.seeMoreLink}>
                See More <ArrowRightTop />
              </NavLink>
            </div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Buy, sell, and swap NFTs instantly</h2>
            <div className={styles.searchWrapper}>
              <Input
                className={styles.searchInput}
                placeholder="Search pools"
                prefix={<SearchOutlined className={styles.searchIcon} />}
              />
              <div className={styles.sortWrapper}>
                <ControlledSelect
                  className={styles.sortingSelect}
                  valueContainerClassName={styles.sortingSelectValueContainer}
                  label="Sort by"
                  control={control}
                  name="sort"
                  options={SORT_VALUES}
                />
              </div>
            </div>
            <ul className={styles.poolsList}>
              {POOLS_DATA.map((item, index) => (
                <li key={index} className={styles.poolCard}>
                  <div className={styles.poolImgWrapper}>
                    <img
                      src={item.poolImage}
                      alt="pool card"
                      className={styles.poolImage}
                    />
                    <div className={styles.poolShadow}>
                      <p className={styles.poolInfoLabel}>
                        {item.collectionsAmount} collections
                      </p>
                      <p className={styles.poolInfoLabel}>
                        {item.itemsAmount} items
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardContentWrapper}>
                    <div className={styles.poolTokenInfo}>
                      <div
                        className={styles.tokenImage}
                        style={{ backgroundImage: `url(${item.tokenImage})` }}
                      />
                      <p className={styles.tokenName}>{item.tokenName}</p>
                    </div>
                    <span className={styles.priceLabel}>price</span>
                    <div className={styles.priceWrapper}>
                      <span className={styles.poolPrice}>{item.price}</span>
                      <SolanaIcon />
                      <span className={styles.priceCurrency}>SOL</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MarketPage;
