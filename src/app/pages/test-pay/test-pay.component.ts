import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>; // Додано опціональну властивість
      disconnect: () => Promise<void>;
      signTransaction: (transaction: Transaction) => Promise<Transaction>;
    };
  }
}

@Component({
  selector: 'app-test-pay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Crypto Payment without smart contract</h1>
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
export class TestPayComponent {
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
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const connection = new Connection('https://long-skilled-season.solana-mainnet.quiknode.pro/2da716183647167a56500fd25c7d1282e6641e2d/'); // Замініть на отриманий RPC-ендпоінт
      const provider = (window as any).solana;

      const fromPublicKey = new PublicKey(this.walletAddress);
      const toPublicKey = new PublicKey('1QBxp9VbxNxFcGveRJahZPWgfr4QcVEHqvHn5KeRBhf'); 
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports: 0.001 * 1e9 // Convert SOL to lamports (1 SOL = 1e9 lamports)
        })
      );

      transaction.feePayer = fromPublicKey;
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      console.log('Transaction constructed:', transaction);

      const signedTransaction = await provider.signTransaction(transaction);
      console.log('Transaction signed:', signedTransaction);

      const serializedTransaction = signedTransaction.serialize();
      console.log('Serialized transaction:', serializedTransaction);

      const signature = await connection.sendRawTransaction(serializedTransaction);
      console.log('Transaction sent. Signature:', signature);

      await connection.confirmTransaction(signature);
      alert(`Payment successful! Transaction signature: ${signature}`);
    } catch (err) {
      console.error('Payment failed:', err);
      alert(`Payment failed: ${err.message || 'Unknown error'}`);
    }
  }
}
