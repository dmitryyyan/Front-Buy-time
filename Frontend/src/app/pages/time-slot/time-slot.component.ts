import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeslotService } from '../../services/timeslot.service';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telegramChatId: string;
  isTeacher: boolean;
  teacherNickname: string;
  description: string;
  rating: number;
  tags: string;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  userId: string;
  userDetails?: UserDetails;
  userData?: { id: string };
  isConfirmed?: boolean;
}

@Component({
  selector: 'app-time-slot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {
  userData: UserData | null = null;
  userDetails: UserDetails | null = null;
  timeSlots: TimeSlot[] = [];
  chatId: string | null = null;
  userForm: FormGroup;
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private timeslotService: TimeslotService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      isTeacher: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userDetails = { firstName: 'Невідомо', lastName: 'Невідомо', email: 'Невідомо' };
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      res => {
        this.chatId = res.chatId;
        this.fetchUserData();
      },
      err => console.error('Помилка отримання chatId', err)
    );
  }

  fetchUserData(): void {
    if (!this.chatId) return;
    this.http.get<UserData>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      data => {
        this.userData = data;
        this.userForm.patchValue({ isTeacher: data.isTeacher });
        if (data.id) {
          this.fetchInactiveTimeSlots(data.id);
        }
      },
      err => console.error('Помилка отримання даних користувача', err)
    );
  }

  fetchInactiveTimeSlots(userId: string): void {
    this.timeslotService.getAllTimeSlots().subscribe(
      slots => {
        const filtered = slots.filter(slot => !slot.isAvailable && slot.userId === userId);
        const result: TimeSlot[] = [];

        filtered.forEach(slot => {
          this.http.get<any>(`http://localhost:5258/api/booking/get-by-timeslot-id?timeSlotId=${slot.id}`).subscribe(
            bookings => {
              const booking = bookings?.[0];
              if (booking) {
                slot.userData = booking;
                slot.isConfirmed = booking.status === 'confirmed';

                if (!slot.isConfirmed) {
                  this.http.get<any>(`http://localhost:5258/api/user/get-by-id?id=${booking.userId}`).subscribe(
                    user => {
                      slot.userDetails = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                      };
                      result.push(slot);
                      this.timeSlots = [...result]; // оновлюємо тільки непідтверджені
                    }
                  );
                }
              }
            }
          );
        });
      },
      err => console.error('Помилка отримання слотів', err)
    );
  }

  openConfirmationDialog(slotId: string): void {
    const slot = this.timeSlots.find(s => s.id === slotId);
    if (!slot || !slot.userData) {
      alert('Немає даних для підтвердження.');
      return;
    }

    const bookingId = slot.userData.id;
    const message = prompt('Введіть повідомлення:');
    const contact = prompt('Введіть контакт (посилання):');

    if (message && contact) {
      this.confirmBooking(bookingId, message, contact, slotId);
    }
  }

  confirmBooking(bookingId: string, message: string, contact: string, slotId: string): void {
    this.isSubmitting = true;

    const body = {
      bookingId,
      confirmationMessage: message,
      contactLink: contact
    };

    this.http.post('http://localhost:5258/api/booking/confirm', body).subscribe(
      () => {
        alert('✅ Підтверджено!');
        // Видаляємо підтверджений слот з локального масиву
        this.timeSlots = this.timeSlots.filter(slot => slot.id !== slotId);
      },
      err => {
        console.error('❌ Помилка підтвердження', err);
        alert('❌ Сталася помилка при підтвердженні.');
      },
      () => this.isSubmitting = false
    );
  }

  expertCancel(slotId: string): void {
    const slot = this.timeSlots.find(s => s.id === slotId);
    if (!slot || !slot.userData) {
      alert('Неможливо знайти бронювання.');
      return;
    }

    const confirmMsg = confirm('Ви дійсно хочете скасувати бронювання?');
    if (!confirmMsg) return;

    this.http.post('http://localhost:5258/api/booking/cancel', {
      bookingId: slot.userData.id,
      cancellationMessage: 'Скасовано експертом'
    }).subscribe(
      () => {
        alert('❌ Бронювання скасовано.');
        this.timeSlots = this.timeSlots.filter(s => s.id !== slotId);
      },
      err => {
        console.error('Помилка скасування', err);
        alert('❌ Не вдалося скасувати.');
      }
    );
  }

  navigateToUserPage(): void {
    this.router.navigate(['/user-page']);
  }

  openUserDetailsModal(userDetails: UserDetails): void {
    alert(`Ім'я: ${userDetails.firstName}\nПрізвище: ${userDetails.lastName}\nEmail: ${userDetails.email}`);
  }
  hasUnconfirmedSlots(): boolean {
    return this.timeSlots.some(slot => !slot.isAvailable && !slot.isConfirmed);
  }
}
