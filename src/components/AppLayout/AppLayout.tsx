import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletContent from '../WalletContent';
import { useLocation } from 'react-router-dom';
import { useWalletModal } from '../../contexts/walletModal';
import { Header } from './Header';
import classNames from 'classnames';

interface AppLayoutProps {
  CustomHeader?: React.FunctionComponent;
  headerText?: string;
  children: any;
  className?: string;
  mainClassName?: string;
  isLarge?: boolean;
}

const AppLayout = ({
  CustomHeader,
  headerText,
  children,
  className,
  mainClassName,
  isLarge = false,
}: AppLayoutProps): JSX.Element => {
  const { connected } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const location = useLocation();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [prevOffsetTop, setPrevOffsetTop] = useState(0);

  const onContentScroll = (event) => {
    const offset = event.target.scrollTop;

    if (offset > scrollTop) setPrevOffsetTop(offset);
    if (offset < prevOffsetTop) setScrollTop(offset);

    if (offset > 200 && offset > prevOffsetTop) setIsHeaderHidden(true);
    if (offset + 100 < prevOffsetTop) setIsHeaderHidden(false);
  };

  useEffect(() => {
    visible && setVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <Header
        className={classNames(styles.header, {
          [styles.headerHide]: isHeaderHidden,
        })}
        visible={visible}
        connected={connected}
        CustomHeader={CustomHeader}
        isLarge={isLarge}
      />
      <div
        className={`${styles.main} ${mainClassName || ''}`}
        onScroll={onContentScroll}
        id="mainContent"
      >
        {visible && <WalletContent />}
        {headerText && <div className={styles.subHeader}>{headerText}</div>}
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
