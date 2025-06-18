import { Injectable } from '@angular/core';
import { TonConnect, Wallet } from '@tonconnect/sdk';
import { TeacherService } from '../react-ton-connect/teacher.service';

@Injectable({
  providedIn: 'root',
})
export class TonConnectService {
  private _tonConnect: TonConnect;
  walletAddress: string | null = null;

  constructor(private teacherService: TeacherService) {
    this._tonConnect = new TonConnect({
      manifestUrl: 'https://dmitryyyan.github.io/ton-wallet-manifest/tonconnect-manifest.json',
    });

    // Відновлення підключення до гаманця
    this._tonConnect.restoreConnection().then(() => {
      const wallet = this._tonConnect.wallet;
      if (wallet?.account?.address) {
        this.walletAddress = wallet.account.address;
        this.saveWalletAddress(this.walletAddress); // Зберігаємо адресу гаманця
        console.log('🔄 Wallet restored:', this.walletAddress);
      }
    });

    // Слухаємо зміни статусу підключення до гаманця
    this._tonConnect.onStatusChange((wallet: Wallet | null) => {
      if (wallet?.account?.address) {
        this.walletAddress = wallet.account.address;
        this.saveWalletAddress(this.walletAddress); // Зберігаємо адресу гаманця
        console.log('🟢 Wallet connected:', this.walletAddress);
      } else {
        this.walletAddress = null;
        console.log('🔴 Wallet disconnected');
      }
    });
  }

  // Отримуємо інстанс TonConnect для доступу до гаманця
  get tonConnectInstance(): TonConnect {
    return this._tonConnect;
  }

  // Перевірка чи гаманець підключений
  isWalletConnected(): boolean {
    return !!this.walletAddress;
  }

  // Отримання адреси гаманця
  getAddress(): string | null {
    return this.walletAddress;
  }

  // Очікування підключення до гаманця
  async waitForWalletConnection(timeout = 10000): Promise<void> {
    const start = Date.now();
    while (!this.walletAddress && (Date.now() - start < timeout)) {
      await new Promise(res => setTimeout(res, 50));
    }
    if (!this.walletAddress) {
      throw new Error('Wallet not connected within timeout.');
    }
  }

  // Підключення до гаманця
  async connectWallet(): Promise<void> {
    await this._tonConnect.restoreConnection();
    if (!this.walletAddress) {
      throw new Error('Please connect your wallet via the UI button');
    }
  }

  // Відправка транзакції
  async sendTonToTeacher(chatId: string, amountTon: number, teacherWalletAddress: string): Promise<void> {
    try {
      const amountNano = BigInt(amountTon * 1e9).toString(); // конвертуємо в нано-тон
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 100,
        messages: [
          {
            address: teacherWalletAddress, // використовуємо передану адресу
            amount: amountNano,
          },
        ],
      };
      console.log('📝 Transaction object:', tx);
      const result = await this._tonConnect.sendTransaction(tx);
      console.log('✅ Transaction sent, BOC:', result.boc);
    } catch (err) {
      console.error('Error sending transaction:', err);
      throw err;
    }
  }

  // Збереження адреси гаманця
  async saveWalletAddress(walletAddress: string): Promise<void> {
    try {
      if (!walletAddress) return;
      const chatId = this.getChatIdFromLocalStorage();
      if (chatId) {
        await this.teacherService.saveWalletAddressByChatId(chatId, walletAddress).toPromise();
        console.log('Wallet address saved successfully:', walletAddress, 'for chatId:', chatId);
      } else {
        console.warn('ChatId not found in localStorage! Address is NOT saved.');
      }
    } catch (error) {
      console.error('Error saving wallet address:', error);
    }
  }

  // Отримуємо ChatId з localStorage
  getChatIdFromLocalStorage(): string | null {
    return localStorage.getItem('chatId');
  }

  // Якщо треба зберегти вручну
  async connectAndSaveTeacherWallet(chatId: string): Promise<void> {
    try {
      await this._tonConnect.restoreConnection();
      if (!this.walletAddress) {
        throw new Error('Please connect your wallet');
      }
      await this.teacherService.saveWalletAddressByChatId(chatId, this.walletAddress).toPromise();
      console.log('Teacher wallet connected and saved:', this.walletAddress);
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  }
}
