import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ArtTitle } from '../../components/ArtCard/ArtTitle';
import ArtImage from '../../components/ArtImage';
import { Frakt } from '../../contexts/frakts';
import { useLazyArtImageSrc } from '../../hooks';
import { getPointsForArt } from '../CollectionPage/helpers';
import styles from './styles.module.scss';
import { URLS } from '../../constants';

interface FraktCheckboxProps {
  frakt: Frakt;
  isSelected: boolean;
  lockedText?: string;
  onClick: () => void;
}

const FraktCheckbox = ({
  frakt,
  isSelected,
  lockedText,
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
      className={classNames([
        styles.fraktCheckbox,
        { [styles.fraktCheckbox_selected]: isSelected },
        { [styles.fraktCheckbox_locked]: lockedText },
      ])}
      onClick={onClick}
    >
      <NavLink
        className={styles.fraktCheckbox__artPageLink}
        to={`${URLS.COLLECTION}/${frakt.metadata.artAccountPubkey}`}
      >
        Art page
      </NavLink>
      <ArtImage className={styles.fraktCheckbox__img} src={src} />
      {lockedText && (
        <div className={styles.fraktCheckbox__lockMessage}>{lockedText}</div>
      )}
      <div className={styles.fraktCheckbox__info}>
        <ArtTitle color={color} shape={shape} />
        <p className={styles.rarity}>{getPointsForArt(frakt)} points</p>
      </div>
    </div>
  );
};

export default FraktCheckbox;
