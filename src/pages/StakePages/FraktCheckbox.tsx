import React, { useEffect } from 'react';

import { ArtTitle } from '../../components/ArtCard/ArtTitle';
import ArtImage from '../../components/ArtImage';
import { Frakt } from '../../contexts/frakts';
import { useLazyArtImageSrc } from '../../hooks';
import { getPointsForArt } from '../CollectionPage/helpers';
import styles from './styles.module.scss';

interface FraktCheckboxProps {
  frakt: Frakt;
  isSelected: boolean;
  onClick: () => void;
}

const FraktCheckbox = ({
  frakt,
  isSelected,
  onClick,
}: FraktCheckboxProps): JSX.Element => {
  const {
    attributes: { color, image_url, shape },
  } = frakt;

  const { src, getSrc } = useLazyArtImageSrc();

  useEffect(() => {
    image_url && getSrc(frakt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.fraktCheckbox} ${
        isSelected ? styles.fraktCheckbox_selected : ''
      }`}
      onClick={onClick}
    >
      <ArtImage className={styles.fraktCheckbox__img} src={src} />
      <div className={styles.fraktCheckbox__info}>
        <ArtTitle color={color} shape={shape} />
        <p className={styles.rarity}>{getPointsForArt(frakt)} points</p>
      </div>
    </div>
  );
};

export default FraktCheckbox;
