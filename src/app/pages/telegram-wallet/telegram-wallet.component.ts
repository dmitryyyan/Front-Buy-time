import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-telegram-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Telegram Wallet Integration</h1>
      <button (click)="connectTelegramWallet()">Connect Telegram Wallet</button>
      <div *ngIf="walletAddress">
        <p>Connected Wallet: {{ walletAddress }}</p>
        <button (click)="makePayment()">Make Payment</button>
      </div>
    </div>
  `,
  styles: [`
    div {
      text-align: center;
      margin-top: 50px;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 16px;
    }
  `]
})
export class TelegramWalletComponent {
  walletAddress: string | null = null;

  async connectTelegramWallet() {
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (!tg) {
        alert('Telegram WebApp API not found. Please open this app inside Telegram.');
        return;
      }

      // Ініціалізація Telegram WebApp
      tg.ready();

      // Отримання даних гаманця через Telegram WebApp
      tg.sendData('get_wallet_address'); // Надсилаємо запит на отримання адреси гаманця
      tg.onEvent('wallet_address', (data: any) => {
        if (data?.address) {
          this.walletAddress = data.address;
          alert(`Wallet connected successfully! Address: ${this.walletAddress}`);
        } else {
          alert('Failed to retrieve wallet address.');
        }
      });
    } catch (error) {
      console.error('Failed to connect Telegram Wallet:', error);
      alert('Failed to connect Telegram Wallet: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async makePayment() {
    if (!this.walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      // Example: Send payment request to Telegram Wallet
      alert(`Payment initiated for wallet: ${this.walletAddress}`);
      // Add your payment logic here
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
}
