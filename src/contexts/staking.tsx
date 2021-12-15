/* eslint-disable require-await */
import React, { useState, useContext, useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import { getAllUserTokens } from 'solana-nft-metadata';
import moment from 'moment';

import config from '../config';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { notify } from '../utils/solanaUtils';
import { Frakt } from './frakts';
import { useFrktBalance } from './frktBalance';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);
const farmingMintPubKey = new PublicKey(config.FARMING_TOKEN_MINT);

interface StakingContextInterface {
  userStakeAccounts: contract.StakeView[];
  userStakeAccountsAvailableToUnstake: contract.StakeView[];
  poolConfigAccount: contract.PoolConfigView;
  stakeAccounts: contract.StakeView[];
  reusableStakeAccounts: contract.StakeView[];
  userFrakts: Frakt[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  silentFetchData: () => Promise<void>;
  stakeFrakts: (
    artsAndMints: ArtAndMintWithoutTokenPubkey[],
  ) => Promise<boolean>;
  unstakeFrakts: (
    artsAndMints: UpdateStakeParamsWithoutTokenPubkey[],
  ) => Promise<boolean>;
  updateStakeFrakts: (
    artsAndMints: contract.UnstakeParams[],
  ) => Promise<boolean>;
  harvestStakes: (stakesPubkeys: PublicKey[]) => Promise<boolean>;
}

export const StakingContext = React.createContext({
  userStakeAccounts: [],
  userStakeAccountsAvailableToUnstake: [],
  poolConfigAccount: null,
  stakeAccounts: [],
  reusableStakeAccounts: [],
  userFrakts: [],
  loading: false,
  error: null,
  fetchData: async () => {},
  silentFetchData: async () => {},
  stakeFrakts: async () => false,
  unstakeFrakts: async () => false,
  updateStakeFrakts: async () => false,
  harvestStakes: async () => false,
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

  const { connection } = useConnection();
  const wallet = useWallet();
  const { setBalance: setFrktBalance } = useFrktBalance();

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
      setFrktBalance(tokens);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const silentFetchData = async (): Promise<void> => {
    try {
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
      setFrktBalance(tokens);
    } catch (error) {
      setError(error);
    }
  };

  const userStakeAccounts = useMemo((): contract.StakeView[] => {
    return stakeAccounts.filter(
      ({ stake_owner, is_staked }) =>
        stake_owner === `${wallet.publicKey}` && is_staked,
    );
  }, [stakeAccounts, wallet]);

  const reusableStakeAccounts = useMemo((): contract.StakeView[] => {
    return stakeAccounts.filter(({ is_staked }) => !is_staked);
  }, [stakeAccounts]);

  const userStakeAccountsAvailableToUnstake = useMemo(() => {
    return userStakeAccounts.filter(({ stake_end_at }) => {
      return moment().unix() - Number(stake_end_at) >= 0;
    });
  }, [userStakeAccounts]);

  const stakeFrakts = async (
    artsAndMints: ArtAndMintWithoutTokenPubkey[],
  ): Promise<boolean> => {
    try {
      const userTokens = await getAllUserTokens(wallet.publicKey, {
        connection,
      });

      const artsAndMintsWithAccountPubkey: contract.ArtAndMint[] =
        artsAndMints.map((artAndMint) => {
          const { tokenAccountPubkey } = userTokens.find(
            (userToken) => userToken.mint === artAndMint.mintPubKey.toString(),
          );
          return {
            ...artAndMint,
            userTokenAccount: new PublicKey(tokenAccountPubkey),
          };
        });

      void (await contract.stakeBulkFrakts(
        artsAndMintsWithAccountPubkey,
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

  const unstakeFrakts = async (
    fraktsAndStakes: contract.UnstakeParams[],
  ): Promise<boolean> => {
    try {
      void (await contract.unstakeBulkFrakts(
        fraktsAndStakes,
        farmingMintPubKey,
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
        message: `${fraktsAndStakes.length} Frakts unstaked successfully`,
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

  const updateStakeFrakts = async (
    fraktsAndStakes: UpdateStakeParamsWithoutTokenPubkey[],
  ): Promise<boolean> => {
    const userTokens = await getAllUserTokens(wallet.publicKey, {
      connection,
    });

    const fraktsAndStakesWithAccountPubkey: contract.UpdateStakeParams[] =
      fraktsAndStakes.map((fraktAndStake) => {
        const { tokenAccountPubkey } = userTokens.find(
          (userToken) => userToken.mint === fraktAndStake.mintPubKey.toString(),
        );
        return {
          ...fraktAndStake,
          userTokenAccount: new PublicKey(tokenAccountPubkey),
        };
      });

    try {
      void (await contract.updateStakeBulkFrakts(
        fraktsAndStakesWithAccountPubkey,
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
        message: `${fraktsAndStakes.length} Frakts staked successfully`,
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
        message: `FRKT harvested successfully`,
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
        userStakeAccountsAvailableToUnstake,
        poolConfigAccount,
        stakeAccounts,
        reusableStakeAccounts,
        loading,
        error,
        fetchData,
        silentFetchData,
        stakeFrakts,
        unstakeFrakts,
        updateStakeFrakts,
        harvestStakes,
        userFrakts,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextInterface => {
  const {
    userStakeAccounts,
    userStakeAccountsAvailableToUnstake,
    poolConfigAccount,
    stakeAccounts,
    reusableStakeAccounts,
    loading,
    error,
    fetchData,
    silentFetchData,
    stakeFrakts,
    unstakeFrakts,
    updateStakeFrakts,
    userFrakts,
    harvestStakes,
  } = useContext(StakingContext);
  return {
    userStakeAccounts,
    userStakeAccountsAvailableToUnstake,
    poolConfigAccount,
    stakeAccounts,
    reusableStakeAccounts,
    loading,
    error,
    fetchData,
    silentFetchData,
    stakeFrakts,
    unstakeFrakts,
    updateStakeFrakts,
    userFrakts,
    harvestStakes,
  };
};

export interface ArtAndMintWithoutTokenPubkey {
  artPubKey: PublicKey;
  mintPubKey: PublicKey;
}

export interface UpdateStakeParamsWithoutTokenPubkey {
  artPubKey: PublicKey;
  mintPubKey: PublicKey;
  stakePubkey: PublicKey;
}
