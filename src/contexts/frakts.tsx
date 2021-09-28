/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import { useWallet } from '../external/contexts/wallet';
import { useConnection } from '../external/contexts/connection';
import config, { CACHE_URL } from '../config';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);

interface FraktsContextInterface {
  frakts: any[];
  arweaveMetadata: any;
  fraktsLoading: boolean;
  currentUserFrakts: any[];
  currentUserFraktsLoading: boolean;
  upgradeFrakts: (frakts: any) => Promise<boolean>;
  getFraktOwner: (fraktMintedTokenPubkey: PublicKey) => Promise<string | null>;
  getWalletFrakts: (walletPubkey: PublicKey) => Promise<any>;
}

export const FraktsContext = React.createContext({
  frakts: [],
  arweaveMetadata: {},
  fraktsLoading: false,
  currentUserFrakts: [],
  currentUserFraktsLoading: false,
  upgradeFrakts: async (frakts: any): Promise<boolean> => false,
  getFraktOwner: async (
    fraktMintedTokenPubkey: PublicKey,
  ): Promise<string | null> => null,
  getWalletFrakts: async (walletPubkey: PublicKey): Promise<any> => [],
});

export const getFraktRarity = ({
  color_rarity,
  shape_rarity,
}: {
  color_rarity: number;
  shape_rarity: number;
}): number => (color_rarity * shape_rarity) / 100;

export const FraktsProvider = ({ children = null as any }): JSX.Element => {
  const [frakts, setFrakts] = useState([]);
  const [fraktsLoading, setFraktsLoading] = useState<boolean>(true);

  const [arweaveMetadata, setArweaveMetadata] = useState({});

  const [currentUserFrakts, setCurrentUserFrakts] = useState([]);
  const [currentUserFraktsLoading, setCurrentUserFraktsLoading] =
    useState<boolean>(false);

  const { wallet, connected } = useWallet();
  const connection = useConnection();

  const proccessFrakts = (frakts: any[]): any[] => {
    return frakts
      .map((frakt) => ({
        ...frakt,
        attributes: {
          ...frakt.attributes,
          rarity: getFraktRarity({
            color_rarity: frakt.attributes.color_rarity,
            shape_rarity: frakt.attributes.shape_rarity,
          }),
        },
      }))
      .filter((frakt) => frakt.metadata.is_minted === true);
  };

  useEffect(() => {
    getFrakts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    connected &&
      !currentUserFrakts?.length &&
      !currentUserFraktsLoading &&
      getCurrentUserFrakts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  const getFrakts = async (): Promise<void> => {
    setFraktsLoading(true);
    try {
      const [fraktsRes, metadataRes] = await Promise.all([
        fetch(`${CACHE_URL}/arts.json`, {
          headers: { 'Accept-Encoding': 'gzip' },
        }),
        fetch(`${CACHE_URL}/meta.json`, {
          headers: { 'Accept-Encoding': 'gzip' },
        }),
      ]);
      const rawFrakts = await fraktsRes.json();
      const metadata = await metadataRes.json();
      setFrakts(proccessFrakts(Object.values(rawFrakts)));
      setArweaveMetadata(metadata);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setFraktsLoading(false);
    }
  };

  const getCurrentUserFrakts = async (): Promise<void> => {
    setCurrentUserFraktsLoading(true);
    try {
      const tokens = await contract.getAllUserTokens(wallet.publicKey, {
        connection,
      });
      const tokensMint = tokens.map(({ mint }) => mint);

      if (!frakts?.length && !fraktsLoading) {
        await getFrakts();
      }

      const userFrakts = frakts.filter((frakt) => {
        return tokensMint.includes(frakt?.metadata?.minted_token_pubkey);
      });

      setCurrentUserFrakts(userFrakts);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setCurrentUserFraktsLoading(false);
    }
  };

  const getWalletFrakts = async (walletPubkey: PublicKey): Promise<any[]> => {
    try {
      const tokens = await contract.getAllUserTokens(walletPubkey, {
        connection,
      });
      const tokensMint = tokens.map(({ mint }) => mint);

      if (!frakts?.length && !fraktsLoading) {
        await getFrakts();
      }

      const userFrakts = frakts.filter((frakt) => {
        return tokensMint.includes(frakt?.metadata?.minted_token_pubkey);
      });

      return userFrakts;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const upgradeFrakts = async (arts: any[]): Promise<boolean> => {
    try {
      void (await contract.migrateArtsToNewTokens(
        arts,
        wallet.publicKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        { connection },
      ));
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const getFraktOwner = async (
    fraktMintedTokenPubkey: PublicKey,
  ): Promise<string> => {
    const largestTokenAccountOwner =
      await contract.getLargestTokenAccountOwnerByMint(fraktMintedTokenPubkey, {
        connection,
      });
    return largestTokenAccountOwner as string;
  };

  return (
    <FraktsContext.Provider
      value={{
        frakts,
        arweaveMetadata,
        fraktsLoading,
        currentUserFrakts,
        currentUserFraktsLoading,
        upgradeFrakts,
        getFraktOwner,
        getWalletFrakts,
      }}
    >
      {children}
    </FraktsContext.Provider>
  );
};

export const useFrakts = (): FraktsContextInterface => {
  const {
    frakts,
    arweaveMetadata,
    fraktsLoading,
    currentUserFrakts,
    currentUserFraktsLoading,
    upgradeFrakts,
    getFraktOwner,
    getWalletFrakts,
  } = useContext(FraktsContext);
  return {
    frakts,
    arweaveMetadata,
    fraktsLoading,
    currentUserFrakts,
    currentUserFraktsLoading,
    upgradeFrakts,
    getFraktOwner,
    getWalletFrakts,
  };
};
