import React, { useEffect, useState, useRef } from 'react';

import styles from './styles.module.scss';
import ArtImage from '../../../../components/ArtImage';

interface ArtExampleProps {
  imagesSrc: Array<string>;
  interval: number;
  firstChangeDelay?: number;
  className?: string;
}

const ArtExample = ({
  imagesSrc,
  interval,
  firstChangeDelay = 0,
  className = '',
}: ArtExampleProps): JSX.Element => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const intervalRef = useRef(null);

  const intervalHanlder = (): void =>
    setCurrentIdx((prev) => (prev < imagesSrc.length - 1 ? prev + 1 : 0));

  useEffect(() => {
    setTimeout(
      () => (intervalRef.current = setInterval(intervalHanlder, interval)),
      firstChangeDelay,
    );
    return (): void => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.content}>
        {imagesSrc.map((src, idx) => (
          <ArtImage
            key={idx}
            src={src}
            alt="Art example"
            className={idx === currentIdx ? '' : styles.opacity0}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtExample;
