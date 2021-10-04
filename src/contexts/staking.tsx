import React, { useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import { useConnection } from '../external/contexts/connection';
import config from '../config';
import { useWallet } from '../external/contexts/wallet';
import { notify } from '../external/utils/notifications';
import { Frakt } from './frakts';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);

interface StakingContextInterface {
  poolConfigAccount: contract.PoolConfigView;
  stakeAccounts: contract.StakeView[];
  userFrakts: Frakt[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  stakeFrakts: (artsAndMints: contract.ArtAndMint[]) => Promise<boolean>;
}

export const StakingContext = React.createContext({
  poolConfigAccount: null,
  stakeAccounts: [],
  userFrakts: [],
  loading: false,
  error: null,
  fetchData: async () => {},
} as StakingContextInterface);

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const StakingProvider = ({ children = null as any }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const [poolConfigAccount, setPoolConfigAccount] =
    useState<contract.PoolConfigView>(null);
  const [stakeAccounts, setStakeAccounts] = useState<contract.StakeView[]>([]);
  const [userFrakts, setUserFrakts] = useState<Frakt[]>([]);

  const connection = useConnection();
  const { wallet } = useWallet();

  const fetchData = async (): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      const { stakeAccounts, poolConfigAccount, artAccounts } =
        await contract.getAllProgramAccounts(programPubKey, { connection });
      const tokens = await contract.getAllUserTokens(wallet.publicKey, {
        connection,
      });
      const tokensMint = tokens.map(({ mint }) => mint);
      const userFrakts = artAccounts.filter((frakt) => {
        return tokensMint.includes(frakt?.metadata?.minted_token_pubkey);
      });

      setUserFrakts(userFrakts as Frakt[]);
      setPoolConfigAccount(poolConfigAccount);
      setStakeAccounts(stakeAccounts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const stakeFrakts = async (
    artsAndMints: contract.ArtAndMint[],
  ): Promise<boolean> => {
    try {
      void (await contract.stakeBulkFrakts(
        artsAndMints,
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
      notify({
        message: `${artsAndMints.length} Frakts staked successfully`,
        type: 'success',
      });
      return true;
    } catch (error) {
      notify({
        message: 'Transaction failed',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <StakingContext.Provider
      value={{
        poolConfigAccount,
        stakeAccounts,
        loading,
        error,
        fetchData,
        stakeFrakts,
        userFrakts,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextInterface => {
  const {
    poolConfigAccount,
    stakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    userFrakts,
  } = useContext(StakingContext);
  return {
    poolConfigAccount,
    stakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    userFrakts,
  };
};
