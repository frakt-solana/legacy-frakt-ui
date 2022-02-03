import { useFrakts } from '../contexts/frakts';
import { useEffect, useRef, useState } from 'react';
import { ipfsUriToGatewayUrl } from '../utils/solanaUtils';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../constants';

export const useLazyArtImageSrc = (): {
  src: string | null;
  loading: boolean;
  error: any | null;
  getSrc: (art: any) => Promise<void>;
  imageFiles: any[];
} => {
  const [src, setSrc] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { arweaveMetadata } = useFrakts();

  const setImageFromIpfs = async (imageUrl: string): Promise<void> => {
    const res = await fetch(ipfsUriToGatewayUrl(imageUrl));
    const { image } = await res.json();
    setSrc(ipfsUriToGatewayUrl(image));
  };

  const setImageFromArweave = async (metadata: any): Promise<void> => {
    const res = await fetch(metadata.account.info.data.uri);
    const data = await res.json();
    setImageFiles(data.properties.files);
    setSrc(data.image);
  };

  const getSrc = async (art: any): Promise<void> => {
    setLoading(true);
    const metadata = arweaveMetadata[art.metadata.minted_token_pubkey];

    try {
      if (!metadata) {
        await setImageFromIpfs(art.attributes?.image_url);
      } else {
        await setImageFromArweave(metadata);
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { src, loading, error, getSrc, imageFiles };
};

export const usePrivatePage = (): void => {
  const { connected } = useWallet();
  const history = useHistory();

  useEffect(() => {
    !connected && history.push(PATHS.ROOT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);
};

export const usePolling = (
  callback: () => Promise<void>,
  delay = 10000,
  retryCount = 0,
): {
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
} => {
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const persistedIsPolling = useRef<boolean>();
  const poll = useRef<any>();
  const retryCountRef = useRef<number>(retryCount);

  persistedIsPolling.current = isPolling;

  const shouldRetry = !!retryCount;

  const stopPolling = () => {
    if (poll.current) {
      clearTimeout(poll.current);
      poll.current = null;
    }
    setIsPolling(false);
  };

  const startPolling = () => {
    setIsPolling(true);
    runPolling();
  };

  const runPolling = () => {
    poll.current = setTimeout(() => {
      callback()
        .then(() => {
          persistedIsPolling.current ? runPolling() : stopPolling();
        })
        .catch(() => {
          if (shouldRetry && retryCount > 0) {
            retryCountRef.current--;
            runPolling();
          } else {
            stopPolling();
          }
        });
    }, delay);
  };

  return { isPolling, startPolling, stopPolling };
};
