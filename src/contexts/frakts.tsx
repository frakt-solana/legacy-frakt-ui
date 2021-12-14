/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import config from '../config';
import { useFrktBalance } from './frktBalance';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);

export interface Frakt {
  metadata: {
    artAccountPubkey: string;
    created_at: number;
    first_owner_pubkey: string;
    id: number;
    isInitialized: boolean;
    is_minted: boolean;
    is_old_version: boolean;
    minted_token_pubkey: string;
  };
  attributes: {
    art_hash: number;
    circles_amount: number;
    color: number;
    color_rarity: number;
    fractial_iterations: number;
    image_url: string;
    max_rad_high_limit: number;
    max_rad_low_limit: number;
    min_rad_high_limit: number;
    min_rad_low_limit: number;
    rarity: number;
    shape: number;
    shape_rarity: number;
  };
}
interface FraktsContextInterface {
  frakts: Frakt[];
  arweaveMetadata: any;
  fraktsLoading: boolean;
  currentUserFrakts: Frakt[];
  currentUserFraktsLoading: boolean;
  upgradeFrakts: (frakts: Frakt[]) => Promise<boolean>;
  getFraktOwner: (fraktMintedTokenPubkey: PublicKey) => Promise<string | null>;
  getWalletFrakts: (walletPubkey: PublicKey) => Promise<Frakt[]>;
}

export const FraktsContext = React.createContext({
  frakts: [],
  arweaveMetadata: {},
  fraktsLoading: false,
  currentUserFrakts: [],
  currentUserFraktsLoading: false,
  upgradeFrakts: async (): Promise<boolean> => false,
  getFraktOwner: async (): Promise<string | null> => null,
  getWalletFrakts: async (): Promise<Frakt[]> => [],
});

export const getFraktRarity = ({
  color_rarity,
  shape_rarity,
}: {
  color_rarity: number;
  shape_rarity: number;
}): number => (color_rarity * shape_rarity) / 100;

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FraktsProvider = ({ children = null as any }): JSX.Element => {
  const [frakts, setFrakts] = useState<Frakt[]>([]);
  const [fraktsLoading, setFraktsLoading] = useState<boolean>(true);
  const { connection } = useConnection();

  const [arweaveMetadata, setArweaveMetadata] = useState({});

  const [currentUserFrakts, setCurrentUserFrakts] = useState<Frakt[]>([]);
  const [currentUserFraktsLoading, setCurrentUserFraktsLoading] =
    useState<boolean>(false);

  const { connected, publicKey, signTransaction } = useWallet();
  const { setBalance: setFrktBalance } = useFrktBalance();

  const proccessFrakts = (frakts: Frakt[]): Frakt[] => {
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
        fetch(config.ARTS_CACHE_URL, {
          headers: { 'Accept-Encoding': 'gzip' },
        }),
        fetch(config.METADATA_CACHE_URL, {
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
      const tokens = await contract.getAllUserTokens(publicKey, {
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
      setFrktBalance(tokens);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setCurrentUserFraktsLoading(false);
    }
  };

  const getWalletFrakts = async (walletPubkey: PublicKey): Promise<Frakt[]> => {
    try {
      const tokens = await contract.getAllUserTokens(walletPubkey, {
        connection,
      });
      const tokensMint = tokens.map(({ mint }) => mint);

      if (!frakts?.length && !fraktsLoading) {
        await getFrakts();
      }

      return frakts.filter((frakt) => {
        return tokensMint.includes(frakt?.metadata?.minted_token_pubkey);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const upgradeFrakts = async (arts: Frakt[]): Promise<boolean> => {
    try {
      void (await contract.migrateArtsToNewTokens(
        arts,
        publicKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = publicKey;
          const signed = await signTransaction(txn);
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
