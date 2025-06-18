import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { TonConnectService } from './ton-connect.service'; // Імпортуємо ваш сервіс для роботи з гаманцем

@Component({
  selector: 'app-react-ton-connect',
  templateUrl: './react-ton-connect.component.html',
  styleUrls: ['./react-ton-connect.component.css']
})
export class ReactTonConnectComponent implements AfterViewInit, OnDestroy {
  private root: ReactDOM.Root | null = null;
  public walletAddress: string | null = null; // Додано для зберігання адреси гаманця

  constructor(
    private elRef: ElementRef,
    private tonConnectService: TonConnectService // Ін'єкція сервісу для роботи з гаманцем
  ) {}

  ngAfterViewInit() {
    const container = this.elRef.nativeElement.querySelector('#react-root');
    this.root = ReactDOM.createRoot(container);

    this.root.render(
      React.createElement(
        TonConnectUIProvider,
        { manifestUrl: 'https://dmitryyyan.github.io/ton-wallet-manifest/tonconnect-manifest.json', children: React.createElement(TonConnectButton) }
      )
    );

    // Підключення до гаманця після ініціалізації компонента
    this.tonConnectService.connectWallet().then(() => {
      this.walletAddress = this.tonConnectService.getAddress(); // Отримуємо адресу гаманця
      console.log("Wallet connected:", this.walletAddress);
    });
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }

  goBack() {
    // Перехід назад
  }

  // Метод для перезапису адреси гаманця
  async updateWalletAddress() {
    if (this.walletAddress) {
      // Якщо адреса є, відправляємо на сервер для збереження
      try {
        await this.tonConnectService.saveWalletAddress(this.walletAddress);
        console.log("Wallet address updated:", this.walletAddress);
        alert("Адресу гаманця успішно перезаписано!");
      } catch (err) {
        console.error("Error updating wallet address:", err);
        alert("Помилка при перезапису адреси гаманця.");
      }
    } else {
      console.warn("No wallet address found to update.");
      alert("Адреса гаманця не знайдена.");
    }
  }
}
