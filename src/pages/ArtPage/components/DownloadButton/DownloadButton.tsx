import React, { useState } from 'react';

import Button from '../../../../components/Button';
import { downloadImageFromURL } from './helpers';
import { SpinnerIcon, DownloadIcon } from '../../../../icons';
import styles from './styles.module.scss';

export const useDownloadArt = (): {
  loading: boolean;
  downloadArt: (src: string, imageName?: string) => Promise<void>;
} => {
  const [loading, setLoading] = useState(false);

  const downloadArt = async (
    src: string,
    imageName?: string,
  ): Promise<void> => {
    setLoading(true);

    try {
      await downloadImageFromURL(src, imageName);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setLoading(false);
  };

  return { loading, downloadArt };
};

interface DownloadButtonProps {
  className?: string;
  size?: string;
  imageFile: string;
  title: string;
}

const DownloadButton = ({
  className = '',
  size = 'md',
  imageFile,
  title,
}: DownloadButtonProps): JSX.Element => {
  const { loading, downloadArt } = useDownloadArt();

  const clickHandler = (): Promise<void> => downloadArt(imageFile, title);

  return (
    <Button
      className={`${className} ${loading ? styles.spinIcon : ''}`}
      size={size}
      Icon={loading ? SpinnerIcon : DownloadIcon}
      onClick={clickHandler}
      disabled={loading || !imageFile}
    >
      Download
    </Button>
  );
};

export default DownloadButton;
