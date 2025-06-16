import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './pages/user-page/user-page.component';
import { ConnectWalletComponent } from './pages/connect-wallet/connect-wallet.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { ReactTonConnectComponent } from './pages/react-ton-connect/react-ton-connect.component';

const routes: Routes = [
  { path: '', component: UserPageComponent },  // Головна сторінка
  { path: 'connect-wallet', component: ConnectWalletComponent },
  { path: 'crypto-payment', component: CryptoPaymentComponent },
  { path: 'react-ton-connect', component: ReactTonConnectComponent },
  // Опціональний catch-all
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
