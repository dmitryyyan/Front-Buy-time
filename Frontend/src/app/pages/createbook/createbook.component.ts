import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TonConnectService } from '../react-ton-connect/ton-connect.service';
import { TeacherService } from '../react-ton-connect/teacher.service';
import { ConfirmDialogComponent } from '../teacher-details/confirm-dialog.component';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';  

// === ДОДАНО КОНСТАНТУ ===
const DEFAULT_RESERVE_WALLET = 'UQDLm0oDAxaE7FztvC5WC0Y3d7K7jkvi_taVU6-Fe0dvBM1u';

@Component({
  selector: 'app-createbook',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css'],
})
export class CreatebookComponent implements OnInit {
  bookingForm: FormGroup;
  teachers: any[] = [];
  timeslots: any[] = [];
  selectedTimeslot: any = null;
  userId: string = '';
  message: string = '';
  urlOfMeeting: string = '';
  isConnected: boolean = false;
  publicKey: string | null = null;
  amount: number = 0.05;
  expertPublicKey: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private tonConnectService: TonConnectService,
    private teacherService: TeacherService,
    private dialog: MatDialog
  ) {
    this.bookingForm = this.fb.group({
      teacherId: ['', Validators.required],
      timeslotId: ['', Validators.required],
      message: [''],
      status: ['Pending'],
      urlOfMeeting: [''],
      startTime: [''],
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.fetchChatId();
  }

  loadTeachers(): void {
    this.http.get('http://localhost:5258/api/teacher/get-all').subscribe((data: any) => {
      this.teachers = data;
    });
  }

  loadTimeslots(teacherId: string): void {
    this.http.get('http://localhost:5258/api/timeslot/get-all').subscribe((data: any) => {
      this.timeslots = data.filter(
        (timeslot: any) => timeslot.userId === teacherId && timeslot.isAvailable === true
      );
      this.http
        .get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${teacherId}`)
        .subscribe((walletData) => {
          this.expertPublicKey = walletData.walletAddress;
        });
    });
  }

  onTeacherChange(event: any): void {
    const teacherId = event.target.value;
    this.loadTimeslots(teacherId);
  }

  onTimeslotChange(event: any): void {
    const selectedTimeslotId = event.target.value;
    this.selectedTimeslot = this.timeslots.find(slot => slot.id === selectedTimeslotId);
    this.bookingForm.get('tonCount')?.setValue(this.selectedTimeslot?.tonCount);
    this.amount = this.selectedTimeslot?.tonCount || 1;
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        const chatId = response.chatId;
        this.fetchUserData(chatId);
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
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
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  fetchWallet(): void {
    this.http
      .get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${this.userId}`)
      .subscribe((walletData) => {
        console.log('Wallet:', walletData.walletAddress);
      });
  }

  async bookTimeSlot(slot: any): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Для бронювання потрібно оплатити ${slot.tonCount || 1} TON. Після цього бронювання підтвердиться автоматично.`,
      },
    });
  
    const confirmed = await dialogRef.afterClosed().toPromise();
    if (!confirmed) {
      this.message = '';
      return;
    }
  
    try {
      this.message = '⏳ Підключення до гаманця...';
      await this.tonConnectService.waitForWalletConnection();
  
      this.message = '📤 Підготовка до оплати...';
  
      const amount = slot.tonCount || 0.05;
      const comment = `Бронювання уроку ${slot.id}`;
  
      // Показуємо все в консолі всередині sendTonToTeacher
      await this.tonConnectService.sendTonToTeacher(
        amount,
        comment
      );
      await this.teacherService.updateTimeSlot({
        ...slot,
        isAvailable: false // або інший прапорець
      }).toPromise();
      // Можна також показати повідомлення в інтерфейсі:
      this.message = `✅ Оплата успішно ініційована на адресу: ${DEFAULT_RESERVE_WALLET}`;
  
    } catch (error: any) {
      this.message = '❌ Сталася помилка при оплаті або букінгу.';
      console.error(error);
    }
  }
  

  submitBooking(): void {
    if (this.bookingForm.valid) {
      const selectedTimeslotId = this.bookingForm.get('timeslotId')?.value;
      const selectedTimeslot = this.timeslots.find((slot) => slot.id === selectedTimeslotId);
  
      if (selectedTimeslot) {
        this.bookTimeSlot(selectedTimeslot);
      } else {
        console.error('Selected timeslot not found!');
        this.message = 'Error! Selected timeslot not found.';
      }
    } else {
      this.message = 'Please fill out the form correctly.';
    }
  }

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
  button1Action() {
    this.router.navigate(['/teacher']);
  }

  button2Action() {
    this.router.navigate(['/add-timeslot']);
  }

  button3Action() {
    this.router.navigate(['/createbook']);
  }

  navigateToUserPage() {
    this.router.navigate(['/user-page']);
  }

}
