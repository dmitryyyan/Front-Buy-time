import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../react-ton-connect/teacher.service';
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
      (data) => {
        this.teacher = data;
        console.log("Teacher details:", data);
      },
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
      async (res) => {
        await this.teacherService.createUserIfNotExists(res.chatId);
        this.fetchUserData(res.chatId);
      },
      (err) => console.error('Error fetching chat ID', err)
    );
  }

  createUserIfNotExists(chatId: string): Promise<any> {
    return this.http.post('http://localhost:5258/api/user/create-if-not-exists', { chatId }).toPromise();
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
    // 1. Відкриваємо діалог оплати
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: 'Для бронювання потрібно оплатити 0.05 TON. Після цього бронювання підтвердиться автоматично.'
      }
    });
  
    const confirmed = await dialogRef.afterClosed().toPromise();
    if (!confirmed) {
      this.message = '';
      return;
    }
  
    try {
      this.isLoading = true;
      this.message = '⏳ Підключення до гаманця...';
      await this.tonConnectService.waitForWalletConnection();
  
      const amount = 0.05;
      let teacherChatId = slot.teacherChatId;
      if (!teacherChatId) {
        const teacher = await this.teacherService.getTeacherById(slot.userId).toPromise();
        teacherChatId = teacher?.telegramChatId;
      }
      if (!teacherChatId) {
        throw new Error('Telegram ChatId у викладача відсутній!');
      }
  
      this.message = '📤 Надсилання TON...';
  
      // --- Ось тут основна обробка помилки ---
      let teacherWalletAddress;
      try {
        teacherWalletAddress = await this.teacherService.getTeacherWalletAddressByChatId(teacherChatId).toPromise();
      } catch (err: any) {
        if (err.status === 500) {
          this.message = '❌ Сталася помилка на сервері при отриманні TON-адреси викладача!';
          alert(this.message + '\n\n(Internal server error)\n\nПовідомте підтримку!');
          throw err;
        }
        throw err;
      }
  
      if (!teacherWalletAddress) {
        this.message = '❌ Викладач ще не підключив TON-гаманець. Оплата неможлива!';
        alert(this.message);
        return;
      }
  
      // --- Далі все як було ---
      await this.tonConnectService.sendTonToTeacher(teacherChatId, amount);
  
      this.message = '📚 Оплата успішна! Створюємо бронювання...';
  
      const bookingData = {
        userId: this.userId,
        timeslotId: slot.id,
        status: 'booked',
        message: '',
        urlOfMeeting: '',
        boc: 'transaction_boc_here',
      };
  
      await this.http.post('http://localhost:5258/api/booking/create', bookingData).toPromise();
      this.message = '✅ Букінг та оплата успішні!';
      slot.isAvailable = false;
    } catch (error: any) {
      // Загальна помилка
      if (error?.status === 500) {
        this.message = '❌ Внутрішня помилка сервера. Спробуйте пізніше або зверніться до підтримки.';
        alert(this.message);
      } else {
        this.message = '❌ Сталася помилка при оплаті або букінгу.';
        alert(this.message + '\n\n' + (error?.message || error));
      }
      console.error('Error in booking or payment:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  

  navigateToTeacherList(): void {
    this.router.navigate(['/teacher']);
  }
}
