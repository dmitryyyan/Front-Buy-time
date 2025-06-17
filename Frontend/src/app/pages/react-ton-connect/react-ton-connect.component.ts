import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';

@Component({
  selector: 'app-react-ton-connect',
  templateUrl: './react-ton-connect.component.html',
  styleUrls: ['./react-ton-connect.component.css']
})
export class ReactTonConnectComponent implements AfterViewInit, OnDestroy {
  private root: ReactDOM.Root | null = null;

  constructor(private elRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    const container = this.elRef.nativeElement.querySelector('#react-root');
    this.root = ReactDOM.createRoot(container);

    this.root.render(
      React.createElement(
        TonConnectUIProvider,
        { manifestUrl: 'https://dmitryyyan.github.io/ton-wallet-manifest/tonconnect-manifest.json', children: React.createElement(TonConnectButton) }
      )
    );
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
 
  goBack() {
    this.router.navigate(['/']); // або потрібний роут
  }

}
