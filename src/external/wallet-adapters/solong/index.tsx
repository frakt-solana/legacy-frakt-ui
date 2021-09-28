import EventEmitter from 'eventemitter3';
import { PublicKey, Transaction } from '@solana/web3.js';
import { WalletAdapter } from '../../contexts/wallet';
import { notify } from '../../utils/notifications';

export class SolongWalletAdapter extends EventEmitter implements WalletAdapter {
  _publicKey: PublicKey | null;
  _onProcess: boolean;
  constructor() {
    super();
    this._publicKey = null;
    this._onProcess = false;
    this.connect = this.connect.bind(this);
  }

  get publicKey(): PublicKey {
    return this._publicKey;
  }

  signTransaction(transaction: Transaction): any {
    return (window as any).solong.signTransaction(transaction);
  }

  connect(): void {
    if (this._onProcess) {
      return;
    }

    if ((window as any).solong === undefined) {
      notify({
        message: 'Solong Error',
        description: 'Please install solong wallet from Chrome ',
      });
      return;
    }

    this._onProcess = true;
    (window as any).solong
      .selectAccount()
      .then((account: any) => {
        this._publicKey = new PublicKey(account);
        this.emit('connect', this._publicKey);
      })
      .catch(() => {
        this.disconnect();
      })
      .finally(() => {
        this._onProcess = false;
      });
  }

  disconnect(): void {
    if (this._publicKey) {
      this._publicKey = null;
      this.emit('disconnect');
    }
  }
}
