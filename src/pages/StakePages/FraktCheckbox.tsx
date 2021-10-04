import React, { useEffect } from 'react';

import { ArtTitle } from '../../components/ArtCard/ArtTitle';
import ArtImage from '../../components/ArtImage';
import { useLazyArtImageSrc } from '../../hooks';
import styles from './styles.module.scss';

interface FraktCheckboxProps {
  frakt: any;
  isSelected: boolean;
  onClick: (frakt: any) => void;
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
        <p className={styles.rarity}>
          {frakt?.attributes.rarity
            ? `${frakt?.attributes.rarity.toFixed(2)}% rarity`
            : ''}
        </p>
      </div>
    </div>
  );
};

export default FraktCheckbox;
