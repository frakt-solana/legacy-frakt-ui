import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';

import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';
import { URLS } from '../../constants';
import { PublicKey } from '@solana/web3.js';
import Preloader from '../../components/Preloader';
import ArtHeader from './components/ArtHeader';
import { getHeaderTitle, getArtInfoData } from './helpers';
import Table from '../../components/Table';
import ArtImage from '../../components/ArtImage';
import { useLazyArtImageSrc } from '../../hooks';
import { useFrakts } from '../../contexts/frakts';

const ArtPage = (): JSX.Element => {
  const { artAccountPubkey } = useParams<{ artAccountPubkey: string }>();
  const history = useHistory();

  const { frakts, fraktsLoading, getFraktOwner } = useFrakts();

  const [frakt, setFrakt] = useState({
    attributes: null,
    metadata: null,
    rarity: 0,
  });
  const {
    getSrc: getImageSrc,
    src: imageSrc,
    imageFiles,
  } = useLazyArtImageSrc();
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [, setLoadingOwnerAddress] = useState(false);
  const [tokenPubkey, setTokenPubkey] = useState(null);

  const loadOwnerAddress = async (art: any): Promise<void> => {
    setLoadingOwnerAddress(true);
    const ownerAddress = await getFraktOwner(
      new PublicKey(art?.metadata.minted_token_pubkey),
    );
    setOwnerAddress(ownerAddress.toString());
    setLoadingOwnerAddress(false);
    const tokenPubkey = art?.metadata?.minted_token_pubkey;
    setTokenPubkey(tokenPubkey.toString());
  };

  const loadArt = async (): Promise<void> => {
    const data = frakts.find(
      (art: any) => art.metadata.artAccountPubkey === artAccountPubkey,
    );
    await loadOwnerAddress(data);
    getImageSrc(data);
    setFrakt({
      attributes: data.attributes,
      metadata: data.metadata,
      rarity: data.attributes.rarity,
    });
  };

  useEffect(() => {
    !fraktsLoading && loadArt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktsLoading]);

  useEffect(() => {
    if (frakt?.metadata) {
      getImageSrc(frakt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frakt]);

  const onBackButtonHandler = (): void =>
    history.length <= 2 ? history.replace(URLS.ROOT) : history.goBack();

  return (
    <AppLayout mainClassName={!imageSrc && styles.appLayoutMain}>
      <div className="container">
        <ArtHeader
          title={getHeaderTitle(frakt)}
          onBackButtonClick={onBackButtonHandler}
          imageFile={imageFiles[2]}
        />
        <Helmet>
          <title>{`Art ${
            frakt?.attributes?.art_hash ? `#${frakt.attributes.art_hash}` : ''
          } | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
        </Helmet>
        <div className={styles.artContainer}>
          {!imageSrc ? (
            <div className={styles.preloaderWrapper}>
              <Preloader size="lg" />
            </div>
          ) : (
            <>
              <ArtImage src={imageFiles[1] || imageSrc} preloaderSize="md" />
              {frakt && (
                <div className={styles.info}>
                  <Table
                    data={getArtInfoData({
                      ownerAddress,
                      artData: frakt,
                      tokenPubkey,
                    })}
                    size="md"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ArtPage;
