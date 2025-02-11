import { Routes } from '@angular/router';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { TestComponent } from './pages/test/test.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AddTimeslotComponent } from './pages/add-timeslot/add-timeslot.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CreatebookComponent } from './pages/createbook/createbook.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';

export const routes: Routes = [
  { path: '', component: NewPageComponent, pathMatch: 'full' },
  { path: 'user-page', component: UserPageComponent },
  { path: 'new-page', component: NewPageComponent },
  { path: 'teacher', component: TeacherComponent },
  {path: 'bookings', component: BookingsComponent},
  { path: 'registration', component: RegistrationComponent},
 { path: 'add-timeslot', component: AddTimeslotComponent},
 { path: 'teach-info/:id', component: TeacherDetailsComponent}
];
