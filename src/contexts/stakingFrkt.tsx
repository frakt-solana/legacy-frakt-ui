import { useWallet, WalletAdapter } from '../external/contexts/wallet';
import { useConnection } from '../external/contexts/connection';
import React, { useContext, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as contract from '@frakters/frkt-staking-library';
import BN from 'bn.js';
import { useFrktBalance } from './frktBalance';
import { notify } from '../external/utils/notifications';
import { getAllUserTokens } from 'frakt-client';
import { frktBNToString } from '../utils';

const SECONDS_IN_YEAR = 31560000;

/* eslint-disable */
const PROGRAMM_PUB_KEY = new PublicKey(
  '4DnSukrEE6Pz6eFE7Gp4XTH6LYm1UVcKqZdJC2wz4ggr',
);
const FRKT_MINT_PUB_KEY = new PublicKey(
  '9V626r7SDWzY4HFg35uxDZpbJ1m5cCb2VLAVkTcaoRNw',
);

let inUse: string[] = [];
export const getStackedInfo = async (
  wallet: WalletAdapter,
  connection: Connection,
) => {
  const walletPubKey = wallet.publicKey.toString();
  const finishDate = new Date().getTime() / 1000;

  const [balanceTokens, data] = await Promise.all([
    getAllUserTokens(wallet.publicKey, { connection }),
    contract.getAllProgramAccounts(PROGRAMM_PUB_KEY, { connection }),
  ]);
  const unstakingWallets = data.stakeFRKTAccounts.filter((stakeWallet) => {
    const isStakeOwnerTheSame = walletPubKey === stakeWallet.stake_owner;
    const isStakedPeriodEnd = stakeWallet.stake_end_at < finishDate;
    const isStaked = stakeWallet.is_staked;

    return isStakeOwnerTheSame && isStakedPeriodEnd && isStaked;
  });

  const reusableWallets = data.stakeFRKTAccounts
    .filter((stakeWallet) => {
      return (
        !stakeWallet.is_staked &&
        stakeWallet.is_initialized &&
        !inUse.find((el) => el === stakeWallet.stakeAccountPubkey)
      );
    })
    .map((el) => new PublicKey(el.stakeAccountPubkey));

  let unstakingAmount = new BN(0);
  unstakingWallets.forEach((el) => {
    return (unstakingAmount = unstakingAmount.add(new BN(el.amount)));
  });

  const stakingAmount = new BN(data.cumulativeAccount.amount_of_staked);

  const amountPerYear = new BN(data.cumulativeAccount.apr * 1e6)
    .mul(stakingAmount)
    .div(new BN(1e10));

  const harvest = new BN(1);

  return {
    unstakingWallets: unstakingWallets.map(
      (el) => new PublicKey(el.stakeAccountPubkey),
    ),
    unstakingAmount,
    reusableWallets,
    amountPerYear,
    balanceTokens,
    stakingAmount,
    harvest,
  };
};

const unstakeFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    customerFRKTAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .unstakeFRKT({
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: customerFRKTAccounts,
      })
      .then(() => {
        cb();
        notify({
          message: `Frakts unstaked successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

const harvestFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    customerFRKTAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .harvestFRKT({
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: customerFRKTAccounts,
      })
      .then(() => {
        cb();
        notify({
          message: `Frakts harvest successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

const stakeFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    reusableWallet: PublicKey,
    cb: () => any,
  ) =>
  (amount: BN) => {
    if (reusableWallet) inUse.push(reusableWallet.toString());
    return contract
      .stakeFRKT({
        amount,
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        stakeAccountGiven: reusableWallet,
        connection,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
      })
      .then(() => {
        cb();
        notify({
          message: `Frakts staked successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

interface StakingFrktContextState {
  staked: BN;
  amountPerYear: BN;
  amountPerSec: number;
  stakeFrakts: (amount: BN) => Promise<boolean>;
  harvestFrakts: () => Promise<boolean>;
  unstakeFrakts: () => Promise<boolean>;
  balance: BN;
  readyForUnstakingAmount: BN;
  harvest: BN;
  refreshStakingInfo: () => Promise<void>;
}

export const StakingFrktContext = React.createContext<StakingFrktContextState>({
  staked: null,
  amountPerYear: null,
  amountPerSec: null,
  harvestFrakts: async () => Promise.resolve(true),
  stakeFrakts: async () => Promise.resolve(true),
  unstakeFrakts: async () => Promise.resolve(true),
  balance: null,
  readyForUnstakingAmount: null,
  harvest: null,
  refreshStakingInfo: () => Promise.resolve(),
});

export const StakingFrktProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { connected, wallet } = useWallet();
  const connection = useConnection();
  const [staked, setStaked] = useState<BN>(null);
  const [amountPerYear, setAmountPerYear] = useState<BN>(null);
  const [amountPerSec, setAmountPerSec] = useState<number>(null);
  const [readyForUnstaking, setReadyForUnstaking] = useState<PublicKey[]>([]);
  const [readyForUnstakingAmount, setReadyForUnstakingAmount] = useState<BN>(
    new BN(0),
  );
  const [reusableWallets, setReusableWallets] = useState<PublicKey[]>([]);
  const [harvest, setHarvest] = useState<BN>(new BN(0));
  const { balance, setBalance } = useFrktBalance();

  const stakingInfoToState = () =>
    getStackedInfo(wallet, connection).then(
      ({
        amountPerYear,
        stakingAmount,
        unstakingAmount,
        reusableWallets,
        unstakingWallets,
        balanceTokens,
        harvest,
      }) => {
        console.log(
          amountPerYear.div(new BN((SECONDS_IN_YEAR / 12) * 1e8)).toString(),
        );
        setBalance(balanceTokens);
        setStaked(stakingAmount);
        setReadyForUnstakingAmount(unstakingAmount);
        setReadyForUnstaking(unstakingWallets);
        setAmountPerYear(amountPerYear);
        setReusableWallets(reusableWallets);
        setAmountPerSec(
          Number.parseFloat(frktBNToString(amountPerYear)) / SECONDS_IN_YEAR,
        );
        setHarvest(harvest);
      },
    );

  const afterUnstakeFrakts = () => {
    setReadyForUnstakingAmount(new BN(0));
    setStaked(new BN(0));
  };

  const afterStakeFrakts = async () => {
    if (reusableWallets.length) {
      setReusableWallets(reusableWallets.splice(1, reusableWallets.length));
    }
  };

  const afterHarvestFrakts = async () => {
    setHarvest(new BN(0));
  };

  useEffect(() => {
    connected && stakingInfoToState();
  }, [connected]);

  return (
    <StakingFrktContext.Provider
      value={{
        amountPerYear,
        amountPerSec,
        staked,
        harvest,
        refreshStakingInfo: stakingInfoToState,
        harvestFrakts: harvestFrakts(
          wallet,
          connection,
          readyForUnstaking,
          afterHarvestFrakts,
        ),
        unstakeFrakts: unstakeFrakts(
          wallet,
          connection,
          readyForUnstaking,
          afterUnstakeFrakts,
        ),
        stakeFrakts: stakeFrakts(
          wallet,
          connection,
          reusableWallets[0],
          afterStakeFrakts,
        ),
        balance,
        readyForUnstakingAmount,
      }}
    >
      {children}
    </StakingFrktContext.Provider>
  );
};

export const useStakingFrkt = () => {
  return useContext(StakingFrktContext);
};
