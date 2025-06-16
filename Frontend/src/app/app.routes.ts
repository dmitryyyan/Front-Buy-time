import { Routes } from '@angular/router';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { AddTimeslotComponent } from './pages/createtimeslot/createtimeslot';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CreatebookComponent } from './pages/createbook/createbook.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';
import { TimeslotPageComponent } from './pages/timeslot-page/timeslot-page.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
//import { TestPayComponent } from './pages/test-pay/test-pay.component';
import { TimeSlotComponent } from './pages/time-slot/time-slot.component';
//import { ContractInteractionComponent } from './pages/contract-interaction/contract-interaction.component';
import { ConnectWalletComponent } from './pages/connect-wallet/connect-wallet.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactTonConnectComponent } from './pages/react-ton-connect/react-ton-connect.component';

export const routes: Routes = [
  { path: '', component: UserPageComponent, pathMatch: 'full' },
  { path: 'user-page', component: UserPageComponent },
  { path: 'new-page', component: NewPageComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'add-timeslot', component: AddTimeslotComponent },
  { path: 'teach-info/:id', component: TeacherDetailsComponent },
  { path :'createbook', component: CreatebookComponent },
  { path : 'timeslot-page', component: TimeslotPageComponent },
  { path: 'crypto-payment', component: CryptoPaymentComponent },
  //{ path: 'test-pay', component: TestPayComponent },
  { path: 'time-slot', component: TimeSlotComponent },
 // { path: 'contract-interaction', component: ContractInteractionComponent },
  { path: 'connect-wallet', component: ConnectWalletComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'react-ton-connect', component: ReactTonConnectComponent },
]
