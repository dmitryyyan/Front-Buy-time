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
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');

    // Завантажуємо інформацію про викладача
    this.teacherService.getTeacherById(teacherId).subscribe(
      (data) => {
        this.teacher = data;
      },
      (error) => console.error('Error fetching teacher details', error)
    );

    // Завантажуємо таймслоти для викладача
    this.teacherService.getTimeSlotsByTeacherId(teacherId).subscribe(
      (data) => {
        this.timeSlots = data;
        // Додаємо tonCount до кожного слоту
        this.timeSlots.forEach((slot) => {
          slot.tonCount = slot.tonCount || 1;  // Встановлюємо 1 за замовчуванням
        });
      },
      (error) => console.error('Error fetching time slots', error)
    );

    this.fetchChatId();
  }

  // Отримання chatId для підключення до користувача
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

  // Метод для порівняння userId з усіма користувачами
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

  // Функція для форматування дати
  formatDate(date: string | number | Date): string {
    const formattedDate = new Date(date).toLocaleString('uk-UA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  // Метод для переходу на сторінку бронювання
  goToBookingPage(slot: any): void {
    this.router.navigate(['/createbook'], { queryParams: { timeslotId: slot.id } });
  }

  navigateToTeacherList(): void {
    this.router.navigate(['/teacher']);
  }
}
