import { Component, OnInit } from '@angular/core';
import { TonConnectService } from '../react-ton-connect/ton-connect.service';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {
  walletAddress: string | null = null;
  connecting = false;
  isConnected = false;

  constructor(private tonConnectService: TonConnectService) {}

  ngOnInit() {
    this.checkWalletConnection();
  }

  // Перевіряємо підключення до гаманця на початку
  async checkWalletConnection() {
    try {
      this.walletAddress = await this.tonConnectService.getAddress();
      if (this.walletAddress) {
        this.isConnected = true;
        console.log("Wallet connected:", this.walletAddress);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  }

  // Підключення до гаманця
  async connect() {
    this.connecting = true;
    try {
      await this.tonConnectService.connectWallet();
      this.walletAddress = this.tonConnectService.getAddress();
      this.isConnected = true;
      console.log("Wallet connected:", this.walletAddress);
    } catch (error) {
      this.connecting = false;
      alert('Не вдалося підключити гаманець');
      console.error('Error connecting wallet:', error);
    } finally {
      this.connecting = false;
    }
  }

  // Відключення від гаманця
  disconnect() {
    this.tonConnectService.walletAddress = null;
    this.walletAddress = null;
    this.isConnected = false;
  }
}
