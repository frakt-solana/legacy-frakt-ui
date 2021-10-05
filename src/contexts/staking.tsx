/* eslint-disable require-await */
import React, { useState, useContext, useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import moment from 'moment';
import { sum } from 'lodash';

import { useConnection } from '../external/contexts/connection';
import config from '../config';
import { useWallet } from '../external/contexts/wallet';
import { notify } from '../external/utils/notifications';
import { Frakt } from './frakts';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);
const farmingMintPubKey = new PublicKey(config.FARMING_TOKEN_MINT);

interface StakingContextInterface {
  userStakeAccounts: contract.StakeView[];
  poolConfigAccount: contract.PoolConfigView;
  stakeAccounts: contract.StakeView[];
  userFrakts: Frakt[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  stakeFrakts: (artsAndMints: contract.ArtAndMint[]) => Promise<boolean>;
  harvestStakes: (stakesPubkeys: PublicKey[]) => Promise<boolean>;
  secondsSumAfterHarvest: number;
  fraktsAvailableToUnstakeAmount: number;
}

export const StakingContext = React.createContext({
  userStakeAccounts: [],
  poolConfigAccount: null,
  stakeAccounts: [],
  userFrakts: [],
  loading: false,
  error: null,
  fetchData: async () => {},
  stakeFrakts: async () => false,
  harvestStakes: async () => false,
  secondsSumAfterHarvest: 0,
  fraktsAvailableToUnstakeAmount: 0,
} as StakingContextInterface);

export const StakingProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
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

  const userStakeAccounts = useMemo((): contract.StakeView[] => {
    return stakeAccounts.filter(
      ({ stake_owner, is_staked }) =>
        stake_owner === `${wallet.publicKey}` && is_staked,
    );
  }, [stakeAccounts, wallet]);

  const secondsSumAfterHarvest = useMemo(() => {
    return sum(
      userStakeAccounts.map(
        ({ last_harvested_at }) => moment().unix() - Number(last_harvested_at),
      ),
    );
  }, [userStakeAccounts]);

  const fraktsAvailableToUnstakeAmount = useMemo(() => {
    return userStakeAccounts.reduce((amount, stakeAccount) => {
      const isAvailableToUnstake =
        moment().unix() - Number(stakeAccount.stake_end_at) >= 0;

      return isAvailableToUnstake ? amount + 1 : amount;
    }, 0);
  }, [userStakeAccounts]);

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

  const harvestStakes = async (
    stakesPubkeys: PublicKey[],
  ): Promise<boolean> => {
    try {
      void (await contract.harvestBulkStakes(
        stakesPubkeys,
        wallet.publicKey,
        farmingMintPubKey,
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
        message: `FRKTs harvested successfully`,
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
        userStakeAccounts,
        poolConfigAccount,
        stakeAccounts,
        loading,
        error,
        fetchData,
        stakeFrakts,
        harvestStakes,
        userFrakts,
        secondsSumAfterHarvest,
        fraktsAvailableToUnstakeAmount,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextInterface => {
  const {
    userStakeAccounts,
    poolConfigAccount,
    stakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    userFrakts,
    secondsSumAfterHarvest,
    fraktsAvailableToUnstakeAmount,
    harvestStakes,
  } = useContext(StakingContext);
  return {
    userStakeAccounts,
    poolConfigAccount,
    stakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    userFrakts,
    secondsSumAfterHarvest,
    fraktsAvailableToUnstakeAmount,
    harvestStakes,
  };
};
