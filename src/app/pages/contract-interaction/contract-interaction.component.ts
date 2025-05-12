// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Connection, PublicKey, Transaction, TransactionInstruction, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
// import { Buffer } from 'buffer'; // Додано імпорт Buffer

// declare global {
//   interface Window {
//     solana?: {
//       isPhantom?: boolean;
//       connect: () => Promise<{ publicKey: { toString: () => string } }>;
//       signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>; // Зроблено опціональним
//       disconnect: () => Promise<void>;
//       signTransaction: (transaction: Transaction) => Promise<Transaction>;
//     };
//   }
// }

// @Component({
//   standalone: true,
//   selector: 'app-contract-interaction',
//   template: `
//     <div class="p-4">
//       <h1 class="text-xl font-bold">Smart Contract Interaction</h1>
//       <button
//         class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         (click)="connectWallet()"
//         [disabled]="isConnected"
//       >
//         {{ isConnected ? 'Wallet Connected' : 'Connect Wallet' }}
//       </button>
//       <div *ngIf="publicKey" class="mt-2 text-gray-700">
//         Connected: {{ publicKey }}
//       </div>
//       <div *ngIf="balance !== null" class="mt-2 text-gray-700">
//         Balance: {{ balance }} SOL
//       </div>
//       <button
//         *ngIf="isConnected"
//         class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
//         (click)="makePayment()"
//       >
//         Make Payment
//       </button>
//       <button
//         *ngIf="isConnected"
//         class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
//         (click)="disconnectWallet()"
//       >
//         Disconnect
//       </button>
//       <button
//         *ngIf="isConnected"
//         class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
//         (click)="requestAirdrop()"
//       >
//         Request Airdrop
//       </button>
//     </div>
//   `,
//   imports: [CommonModule],
// })
// export class ContractInteractionComponent {
//   isConnected: boolean = false;
//   publicKey: string | null = null;
//   balance: number | null = null;
//   private connection = new Connection('https://api.devnet.solana.com', 'confirmed');

//   constructor(private http: HttpClient) {}

//   private writeBigUInt64LE(buffer: Buffer, value: bigint, offset: number) {
//     for (let i = 0; i < 8; i++) {
//       buffer[offset + i] = Number(value & 0xffn);
//       value >>= 8n;
//     }
//   }

//   async connectWallet() {
//     try {
//       if (!('solana' in window)) {
//         if (navigator.userAgent.includes('Telegram')) {
//           alert('This app is running in Telegram Mini App. Please open it in an external browser that supports Phantom Wallet.');
//         } else {
//           alert('Solana object not found. Please open this app in a browser that supports Phantom Wallet.');
//         }
//         return;
//       }

//       const provider = (window as any).solana;
//       if (!provider.isPhantom) {
//         alert('Phantom Wallet not found. Please install it or open this app in a supported browser.');
//         return;
//       }

//       const response = await provider.connect();
//       this.publicKey = response.publicKey.toString();
//       this.isConnected = true;

//       // Отримання балансу після підключення
//       await this.getBalance();

//       alert('Wallet connected successfully!');
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       alert('Failed to connect wallet: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   }

//   async disconnectWallet() {
//     try {
//       if (!window.solana) {
//         throw new Error('Phantom Wallet not found');
//       }
//       await window.solana.disconnect();
//       this.isConnected = false;
//       this.publicKey = null;
//       this.balance = null;
//     } catch (error) {
//       console.error('Failed to disconnect wallet:', error);
//       alert('Failed to disconnect wallet: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   }

//   async getBalance() {
//     try {
//       if (!this.publicKey) {
//         throw new Error('Wallet not connected');
//       }

//       const balance = await this.connection.getBalance(new PublicKey(this.publicKey));
//       this.balance = balance / LAMPORTS_PER_SOL; // Конвертуємо лампорти в SOL
//     } catch (error) {
//       console.error('Failed to fetch balance:', error);
//       alert('Failed to fetch balance: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   }

//   async makePayment() {
//     try {
//       if (!window.solana || !this.publicKey) {
//         throw new Error('Wallet not connected');
//       }

//       const programId = new PublicKey('EabynKLkw2Jb2N8AYzP5XuR3whVmz3hhoic5eSoBUk48'); // Replace with actual Program ID
//       const expertPublicKey = new PublicKey('CQV3QSMYRF8P87ioHVmBHcvP94WaoV4JoB4NVn62KXjY'); // Replace with expert's public key
//       const studentPublicKey = new PublicKey(this.publicKey);
//       const amount = 0.5 * LAMPORTS_PER_SOL; // 0.5 SOL for testing

//       const data = Buffer.alloc(8);
//       this.writeBigUInt64LE(data, BigInt(amount), 0); // Використовуємо власну функцію для запису bigint

//       const instruction = new TransactionInstruction({
//         keys: [
//           { pubkey: studentPublicKey, isSigner: true, isWritable: true }, // Payer
//           { pubkey: expertPublicKey, isSigner: false, isWritable: true }, // Recipient
//           { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // System Program
//         ],
//         programId,
//         data,
//       });

//       const transaction = new Transaction().add(instruction);
//       transaction.feePayer = studentPublicKey;
//       const { blockhash } = await this.connection.getLatestBlockhash();
//       transaction.recentBlockhash = blockhash;

//       const provider = (window as any).solana;
//       const signedTransaction = await provider.signTransaction(transaction);

//       try {
//         const signature = await this.connection.sendRawTransaction(signedTransaction.serialize());
//         await this.connection.confirmTransaction(signature, 'confirmed');
//         alert('Payment successful! Signature: ' + signature);
//       } catch (error: any) {
//         console.error('Payment failed:', error);

//         // Обробка SendTransactionError для отримання логів
//         if (error.logs) {
//           console.error('Transaction logs:', error.logs);
//         } else if (error.getLogs) {
//           const logs = await error.getLogs();
//           console.error('Transaction logs from getLogs():', logs);
//         } else {
//           console.error('No logs available for this transaction.');
//         }

//         alert('Payment failed: ' + (error.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   }

//   async requestAirdrop() {
//     try {
//       if (!this.publicKey) {
//         throw new Error('Wallet not connected');
//       }

//       const publicKey = new PublicKey(this.publicKey);
//       const lamports = 1 * LAMPORTS_PER_SOL; // 1 SOL

//       // Виконуємо запит на airdrop
//       const signature = await this.connection.requestAirdrop(publicKey, lamports);
//       await this.connection.confirmTransaction(signature, 'confirmed');

//       alert(`Airdrop successful! You received 1 SOL.`);
//       // Оновлюємо баланс після airdrop
//       await this.getBalance();
//     } catch (error) {
//       console.error('Airdrop failed:', error);
//       alert('Airdrop failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   }
// }