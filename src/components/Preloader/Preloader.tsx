import React from 'react';

import { PreloaderIcon } from './PreloaderIcon';
import styles from './styles.module.scss';
import { PRELOADER_DEFAULT_SIZES } from './constants';

interface PreloaderProps {
  className?: string;
  size?: string;
  width?: number;
}

const Preloader = ({
  className = '',
  size = 'sm',
  width,
}: PreloaderProps): JSX.Element => (
  <div className={`${styles.root} ${className || ''}`}>
    <PreloaderIcon width={width || PRELOADER_DEFAULT_SIZES[size]} />
  </div>
);

export default Preloader;
