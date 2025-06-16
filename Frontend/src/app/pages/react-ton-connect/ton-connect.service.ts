// ton-connect.service.ts
import { Injectable } from '@angular/core';
import { TonConnect, Wallet, UserRejectsError } from '@tonconnect/sdk';

@Injectable({
  providedIn: 'root',
})
export class TonConnectService {
  // залишаємо приватним
  private _tonConnect: TonConnect;
  walletAddress: string | null = null;

  // ПУБЛІЧНИЙ геттер для доступу до інстансу TonConnect
  get tonConnectInstance(): TonConnect {
    return this._tonConnect;
  }

  constructor() {
    this._tonConnect = new TonConnect({
      manifestUrl: 'https://dmitryyyan.github.io/ton-wallet-manifest/tonconnect-manifest.json',
    });

    // Відновлення попереднього підключення
    this._tonConnect.restoreConnection().then(() => {
      const wallet = this._tonConnect.wallet;
      if (wallet?.account) {
        this.walletAddress = wallet.account.address;
        console.log('🔄 Wallet restored:', this.walletAddress);
      }
    });

    // Слідкуємо за статусом підключення гаманця
    this._tonConnect.onStatusChange((wallet: Wallet | null) => {
      if (wallet?.account) {
        this.walletAddress = wallet.account.address;
        console.log('🟢 Wallet connected:', this.walletAddress);
      } else {
        this.walletAddress = null;
        console.log('🔴 Wallet disconnected');
      }
    });
  }

  // Чи підключений гаманець?
  isWalletConnected(): boolean {
    return !!this.walletAddress;
  }

  // Повертаємо адресу гаманця
  getAddress(): string | null {
    return this.walletAddress;
  }

  // Очікуємо підключення гаманця (таймаут за замовчуванням 10 секунд)
  async waitForWalletConnection(timeout = 10000): Promise<void> {
    const start = Date.now();
    while (!this.walletAddress && (Date.now() - start < timeout)) {
      await new Promise(res => setTimeout(res, 50));
    }
  
    if (!this.walletAddress) {
      throw new Error('Wallet not connected within timeout.');
    }
  }

  // Підключення гаманця (через SDK, UI рендериш окремо)
  async connectWallet(): Promise<void> {
    await this._tonConnect.restoreConnection();
    if (!this.walletAddress) {
      throw new Error('Будь ласка, підключіть гаманець через UI кнопку');
    }
  }

  async sendTon(amountTon: number, recipientAddress: string): Promise<string> {
    if (!this._tonConnect.wallet?.account) {
      throw new Error('Гаманець не підключений');
    }

    const amountNano = BigInt(amountTon * 1e9).toString();

    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 100,
      messages: [
        {
          address: recipientAddress,
          amount: amountNano
        }
      ]
    };

    console.log('📝 Transaction object:', tx);

    try {
      const result = await this._tonConnect.sendTransaction(tx);
      console.log('✅ Transaction sent, BOC:', result.boc);
      return result.boc;
    } catch (err) {
      console.error('❌ Error sending transaction:', err);
      throw err;
    }
  }

  private encodeComment(comment: string): string {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(comment);
    const payloadBytes = [0x01, ...bytes];
    return '0x' + payloadBytes.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
