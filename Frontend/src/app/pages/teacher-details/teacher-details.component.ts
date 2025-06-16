import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ViewChild } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TonConnectService } from '../react-ton-connect/ton-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../teacher-details/confirm-dialog.component';
import { ReactTonConnectComponent } from '../react-ton-connect/react-ton-connect.component';



@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  @ViewChild(ReactTonConnectComponent) reactTonConnectComponent!: ReactTonConnectComponent;
  teacher: any;
  timeSlots: any[] = [];
  bookings: any[] = [];
  userId: string = '';
  message: string = '';
  urlOfMeeting: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tonConnectService: TonConnectService,
    private teacherService: TeacherService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');

    this.teacherService.getTeacherById(teacherId).subscribe(
      (data) => this.teacher = data,
      (error) => console.error('Error fetching teacher details', error)
    );

    this.teacherService.getTimeSlotsByTeacherId(teacherId).subscribe(
      (data) => {
        this.timeSlots = data;
        const timeslotIds = data.map(slot => slot.id);
        this.teacherService.getBookingsByTimeslotIds(timeslotIds).subscribe(
          (bookings) => {
            this.bookings = bookings.filter(b => timeslotIds.includes(b.timeslotId));
            this.compareUserIdWithAllUsers();
          },
          (error) => console.error('Error fetching bookings', error)
        );
      },
      (error) => console.error('Error fetching time slots', error)
    );

    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (res) => this.fetchUserData(res.chatId),
      (err) => console.error('Error fetching chat ID', err)
    );
  }

  fetchUserData(chatId: string): void {
    this.http.get<any>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${chatId}`).subscribe(
      (data) => {
        if (data && !data.message) {
          this.userId = data.id;
          this.fetchWallet();
        }
      },
      (err) => console.error('Error fetching user data', err)
    );
  }

  fetchWallet(): void {
    this.http.get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${this.userId}`).subscribe(
      (data) => {
        console.log('Wallet:', data.walletAddress);
      },
      (err) => console.error('Error fetching wallet data', err)
    );
  }

  compareUserIdWithAllUsers(): void {
    if (!this.userId) return;

    this.http.get<any[]>('http://localhost:5258/api/user/get-all').subscribe(
      (users) => {
        this.bookings.forEach(booking => {
          const match = users.find(user => user.id === booking.userId);
          if (match) booking.user = match;
        });
      },
      (err) => console.error('Error fetching all users', err)
    );
  }

 async bookTimeSlot(slot: any): Promise<void> {
  // Відкриваємо діалог підтвердження
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: '🔐 Оплата 0.05 TON за урок. Продовжити?' }
  });

  // Чекаємо результату діалогу
  const result = await dialogRef.afterClosed().toPromise();

  if (!result) {
    this.message = '⛔ Оплату скасовано.';
    return; // Якщо користувач відмовився — виходимо
  }

  try {
    this.isLoading = true;
    this.message = '⏳ Підключення до гаманця...';

    // Чекаємо підключення гаманця
    await this.tonConnectService.waitForWalletConnection();

    const recipient = this.teacher?.walletAddress || 'UQCLh0egr0z_VyuPXfMZ3wk42e8qmTY7VDs3jU2vKGVrLTFR';
    const amount = 0.05;

    this.message = '📤 Надсилання TON...';

    // Цей виклик відкриє вікно гаманця для підтвердження транзакції
    const boc = await this.tonConnectService.sendTon(amount, recipient);

    this.message = '📚 Оплата успішна! Створюємо бронювання...';

    // Надсилаємо дані бронювання на бекенд
    const bookingData = {
      userId: this.userId,
      timeslotId: slot.id,
      status: 'booked',
      message: '',
      urlOfMeeting: '',
      boc: boc // передаємо BOC на бекенд
    };

    const response = await this.http.post('http://localhost:5258/api/booking/create', bookingData).toPromise();

    console.log('Booking successful:', response);
    this.message = '✅ Букінг та оплата успішні!';
    slot.isAvailable = false;

  } catch (error: any) {
    console.error('Помилка при оплаті або букінгу:', error);

    let userMessage = '❌ Сталася помилка під час оплати або букінгу.';

    if (error?.message?.toLowerCase().includes('user rejects') || error?.message?.toLowerCase().includes('user rejected')) {
      userMessage = '❌ Ви скасували транзакцію.';
    } else if (error?.message?.toLowerCase().includes('not enough')) {
      userMessage = '❌ Недостатньо TON для оплати.';
    }

    this.message = userMessage;

    this.dialog.open(ConfirmDialogComponent, {
      data: { message: userMessage }
    });

  } finally {
    this.isLoading = false;
  }
}

  
  
  navigateToTeacherList(): void {
    this.router.navigate(['/teacher']);
  }
}
