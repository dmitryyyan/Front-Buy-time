import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { ReactTonConnectComponent } from './pages/react-ton-connect/react-ton-connect.component';
import { ConnectWalletComponent } from './pages/connect-wallet/connect-wallet.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CryptoPaymentComponent,
    ConnectWalletComponent,
    ReactTonConnectComponent
    // TonspaceCallbackComponent, // раскоментуй, якщо використовуєш цей компонент
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,  // тут має бути, а не в declarations
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
