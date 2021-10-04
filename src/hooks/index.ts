import { useFrakts } from './../contexts/frakts';
import { useEffect, useState } from 'react';
import { ipfsUriToGatewayUrl } from '../external/utils/ipfs';
import { useWallet } from '../external/contexts/wallet';
import { useHistory } from 'react-router-dom';
import { URLS } from '../constants';

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
    !connected && history.push(URLS.ROOT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);
};
