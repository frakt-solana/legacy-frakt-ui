import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import { useLazyArtImageSrc } from '../../hooks';
import ArtImage from '../ArtImage';

import { ArtTitle } from './ArtTitle';
import ButtonArrow from '../ButtonArrow';

interface ArtCardProps {
  className?: string;
  art: any;
}

const ArtCard = ({ className = '', art = {} }: ArtCardProps): JSX.Element => {
  const {
    attributes: { color, image_url, shape },
  } = art;

  const { src, getSrc } = useLazyArtImageSrc();

  useEffect(() => {
    image_url && getSrc(art);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <ArtImage src={src} />
      <div className={styles.infoWrapper}>
        <ArtTitle color={color} shape={shape} />
        <p className={styles.rarity}>
          {art?.attributes.rarity
            ? `${art?.attributes.rarity.toFixed(2)}% rarity`
            : ''}
        </p>
        <ButtonArrow size="lg" className={styles.exploreButton}>
          Explore
        </ButtonArrow>
      </div>
    </div>
  );
};

export default ArtCard;
