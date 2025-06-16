import { Component, OnInit } from '@angular/core';
import { TonConnect } from '@tonconnect/sdk';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {
  tonConnect = new TonConnect({ manifestUrl: 'https://dmitryyyan.github.io/ton-wallet-manifest/tonconnect-manifest.json' });
  walletAddress: string | null = null;
  connecting = false;

  ngOnInit() {
    this.tonConnect.onStatusChange(wallet => {
      this.walletAddress = (wallet as any)?.account?.address ?? null;
      this.connecting = false;
    });
  }

  async connect() {
    this.connecting = true;
    try {
      await this.tonConnect.connect({ jsBridgeKey: 'wallet' });
      const wallet = this.tonConnect.wallet as any;
      this.walletAddress = wallet?.account?.address ?? null;
    } catch {
      this.connecting = false;
      alert('Не вдалося підключити гаманець');
    }
  }

  disconnect() {
    this.tonConnect.disconnect();
    this.walletAddress = null;
  }
}
