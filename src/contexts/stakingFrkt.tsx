import { useWallet, WalletAdapter } from '../external/contexts/wallet';
import { useConnection } from '../external/contexts/connection';
import React, { useContext, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as contract from '@frakters/frkt-staking-library';
import BN from 'bn.js';
import { useFrktBalance } from './frktBalance';
import { notify } from '../external/utils/notifications';
import { getAllUserTokens } from 'frakt-client';
import config from '../config';

const PROGRAMM_PUB_KEY = new PublicKey(
  '4DnSukrEE6Pz6eFE7Gp4XTH6LYm1UVcKqZdJC2wz4ggr',
);
const FRKT_MINT_PUB_KEY = new PublicKey(config.FARMING_TOKEN_MINT);

const inUse: string[] = [];
// eslint-disable-next-line
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

  const reusableWallets = data.stakeFRKTAccounts
    .filter((stakeWallet) => {
      return (
        !stakeWallet.is_staked &&
        stakeWallet.is_initialized &&
        !inUse.find((el) => el === stakeWallet.stakeAccountPubkey)
      );
    })
    .map((el) => new PublicKey(el.stakeAccountPubkey));

  let unstakingWallets = data.stakeFRKTAccounts.filter((stakeWallet) => {
    const isStakeOwnerTheSame = walletPubKey === stakeWallet.stake_owner;
    const isStaked = stakeWallet.is_staked;
    return isStakeOwnerTheSame && isStaked;
  });

  let stakingAmount = new BN(0);

  unstakingWallets.forEach((el) => {
    const amountBN = new BN(el.amount);
    stakingAmount = stakingAmount.add(amountBN);
  });

  let unstakingAmount = new BN(0);
  let harvest = new BN(0);

  unstakingWallets = unstakingWallets.filter((stakeWallet) => {
    return stakeWallet.stake_end_at < finishDate;
  });

  unstakingWallets.forEach((el) => {
    const amountBN = new BN(el.amount);
    const comulDiff = new BN(data.cumulativeAccount.cumulative).sub(
      new BN(el.staked_at_cumulative),
    );
    harvest = harvest.add(amountBN.mul(comulDiff));
    unstakingAmount = unstakingAmount.add(amountBN);
  });

  const apr = new BN(data.cumulativeAccount.apr);

  return {
    unstakingWallets: unstakingWallets.map(
      (el) => new PublicKey(el.stakeAccountPubkey),
    ),
    unstakingAmount,
    reusableWallets,
    apr,
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
          message: `FRKT unstaked successfully`,
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
          message: `FRKT harvest successfully`,
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
          message: `FRKT staked successfully`,
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
  apr: BN;
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
  apr: null,
  harvestFrakts: async () => await Promise.resolve(true),
  stakeFrakts: async () => await Promise.resolve(true),
  unstakeFrakts: async () => await Promise.resolve(true),
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
  const [apr, setApr] = useState<BN>(null);
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
        apr,
        stakingAmount,
        unstakingAmount,
        reusableWallets,
        unstakingWallets,
        balanceTokens,
        harvest,
      }) => {
        setBalance(balanceTokens);
        setStaked(stakingAmount);
        setReadyForUnstakingAmount(unstakingAmount);
        setReadyForUnstaking(unstakingWallets);
        setApr(apr);
        setReusableWallets(reusableWallets);
        setHarvest(harvest);
      },
    );

  const afterUnstakeFrakts = () => {
    setReadyForUnstakingAmount(new BN(0));
    setStaked(new BN(0));
  };

  const afterStakeFrakts = () => {
    if (reusableWallets.length) {
      setReusableWallets(reusableWallets.splice(1, reusableWallets.length));
    }
  };

  const afterHarvestFrakts = () => {
    setHarvest(new BN(0));
  };

  useEffect(() => {
    connected && stakingInfoToState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <StakingFrktContext.Provider
      value={{
        apr,
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

export const useStakingFrkt = (): StakingFrktContextState => {
  return useContext(StakingFrktContext);
};
