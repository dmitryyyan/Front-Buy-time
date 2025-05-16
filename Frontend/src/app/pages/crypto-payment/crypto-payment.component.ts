import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Buffer } from 'buffer'; // Додано імпорт Buffer

@Component({
  selector: 'app-crypto-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Crypto Payment with smart contract</h1>
      <button (click)="connectWallet()">Connect Phantom Wallet</button>
      <div *ngIf="walletAddress">
        <p>Connected Wallet: {{ walletAddress }}</p>
        <button (click)="makePayment()">Pay with Solana</button>
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
export class CryptoPaymentComponent {
  walletAddress: string | null = null;

  async connectWallet() {
    if ('solana' in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        try {
          const response = await provider.connect();
          this.walletAddress = response.publicKey.toString();
        } catch (err) {
          console.error('Wallet connection failed', err);
        }
      } else {
        alert('Phantom wallet not found. Please install it.');
      }
    } else {
      alert('Solana object not found in window. Please install Phantom wallet.');
    }
  }

  async makePayment() {
    if (!this.walletAddress) {
      alert('Будь ласка, спочатку підключіть свій гаманець.');
      return;
    }

    try {
      const connection = new Connection('https://purple-thrilling-mountain.solana-devnet.quiknode.pro/09620ec9303bc2c2b0c87f937acfba05847b3036/'); // Альтернативний публічний RPC-ендпоінт
      const provider = (window as any).solana;

      const fromPublicKey = new PublicKey(this.walletAddress);
      const programId = new PublicKey('AuSFACKu4wnX6nPia3SDcTum9dTynjfePWh2pZmXaJKg'); // Program ID смарт-контракту

      // Перевірка на валідність Program ID
      const programInfo = await connection.getAccountInfo(programId);
      if (!programInfo) {
        console.error('Програма з вказаним Program ID не знайдена:', programId.toString());
        alert('Помилка: Програма з вказаним Program ID не знайдена. Перевірте конфігурацію.');
        return;
      }

      const recipientPublicKey = new PublicKey('1QBxp9VbxNxFcGveRJahZPWgfr4QcVEHqvHn5KeRBhf'); // Публічний ключ одержувача
      const lamports = 1000000; // Використовуємо ціле число типу number для lamports (0.001 SOL = 1,000,000 лампортів)
      console.log('Відправка', lamports, 'лампортів на адресу', recipientPublicKey.toString());

      // Формуємо дані інструкції (u64 у Little Endian)
      const instructionData = Buffer.alloc(8);
      instructionData.writeUInt32LE(lamports, 0); // Використовуємо writeUInt32LE для запису числа типу number

      try {
        // Перевірка доступності RPC-ендпоінта
        const version = await connection.getVersion();
        console.log('RPC Endpoint доступний. Версія:', version);
      } catch (err) {
        console.error('Помилка доступу до RPC Endpoint:', connection.rpcEndpoint);
        alert('Помилка: Неможливо підключитися до RPC Endpoint. Перевірте підключення до мережі.');
        return;
      }

      if (!programInfo) {
        console.error('Програма з вказаним Program ID не знайдена:', programId.toString());
        console.error('Додаткова інформація:');
        console.error('Program ID:', programId.toString());
        console.error('Recipient Public Key:', recipientPublicKey.toString());
        console.error('From Public Key:', fromPublicKey.toString());
        console.error('RPC Endpoint:', connection.rpcEndpoint);
        alert('Помилка: Програма з вказаним Program ID не знайдена. Перевірте Program ID або розгорніть програму.');
        return;
      }

      if (!programInfo.executable) {
        console.error('Програма з вказаним Program ID не є виконуваною:', programId.toString());
        alert('Помилка: Програма з вказаним Program ID не є виконуваною. Перевірте програму.');
        return;
      }

      const transaction = new Transaction().add({
        keys: [
          { pubkey: fromPublicKey, isSigner: true, isWritable: true },
          { pubkey: recipientPublicKey, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
        ],
        programId,
        data: instructionData
      });

      transaction.feePayer = fromPublicKey;
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      console.log('Транзакція створена:', transaction);

      const signedTransaction = await provider.signTransaction(transaction);
      console.log('Транзакція підписана:', signedTransaction);

      const serializedTransaction = signedTransaction.serialize();
      console.log('Серіалізована транзакція:', serializedTransaction);

      try {
        const signature = await connection.sendRawTransaction(serializedTransaction);
        console.log('Транзакція відправлена. Підпис:', signature);

        await connection.confirmTransaction(signature);
        alert(`Оплата успішна! Підпис транзакції: ${signature}`);
      } catch (err) {
        console.error('Помилка оплати:', err);

        // Додано обробку SendTransactionError для отримання логів
        if (err.logs) {
          console.error('Логи транзакції:', err.logs);
        } else {
          console.error('Логи транзакції відсутні.');
        }

        alert(`Помилка оплати: ${err.message || 'Невідома помилка'}`);
      }
    } catch (err) {
      console.error('Помилка оплати:', err);
      alert(`Помилка оплати: ${err.message || 'Невідома помилка'}`);
    }
  }
}

(window as any).global = window; // Додайте це, якщо виникають проблеми з глобальним об'єктом
