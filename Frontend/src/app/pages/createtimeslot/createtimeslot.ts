import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../react-ton-connect/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-timeslot',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  templateUrl: './createtimeslot.html',
  styleUrls: ['./createtimeslot.css']
})
export class AddTimeslotComponent implements OnInit {
  chatId: string | null = null;
  teacher: any;
  timeSlotData: any = {
    userId: '',
    startTime: '',
    endTime: '',
    isAvailable: false
  };

  selectedDate: string = '';
  timeIntervals: string[] = [];
  selectedIntervals: string[] = [];
  selectedSlot: string = '';
  availableTimes: string[] = [];
  selectedTimeSlot: string = '';
  message: string = '';

  timeSlots = [
    { value: '08-12', label: '08:00 - 12:00' },
    { value: '12-16', label: '12:00 - 16:00' },
    { value: '16-20', label: '16:00 - 20:00' }
  ];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        this.chatId = response.chatId;
        this.fetchUserData();
      },
      (error) => console.error('Error fetching chat ID', error)
    );
  }

  fetchUserData(): void {
    if (!this.chatId) return;

    this.http
      .get<{ id: string }>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`)
      .subscribe(
        (data) => {
          if (data?.id) {
            this.timeSlotData.userId = data.id;
          }
        },
        (error) => console.error('Error fetching user data', error)
      );
  }

  selectTimeSlot(slotValue: string): void {
    this.selectedSlot = slotValue;

    switch (slotValue) {
      case '08-12':
        this.availableTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
        break;
      case '12-16':
        this.availableTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
        break;
      case '16-20':
        this.availableTimes = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
        break;
      default:
        this.availableTimes = [];
    }

    this.selectedTimeSlot = '';
    this.timeIntervals = this.generateTimeIntervals(this.availableTimes[0], this.availableTimes[this.availableTimes.length - 1]);
  }

  generateTimeIntervals(startTime: string, endTime: string): string[] {
    const intervals: string[] = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
      const next = new Date(start.getTime() + 30 * 60000);
      intervals.push(`${this.formatTime(start)} - ${this.formatTime(next)}`);
      start = next;
    }

    return intervals;
  }

  formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  toggleIntervalSelection(interval: string): void {
    const index = this.selectedIntervals.indexOf(interval);
    if (index > -1) {
      this.selectedIntervals.splice(index, 1);
    } else {
      this.selectedIntervals.push(interval);
    }
  }

  formatDateTime(date: string, time: string): string {
    const dateTime = new Date(`${date}T${time}:00`);
    dateTime.setHours(dateTime.getHours() + 2); // UTC+2
    return dateTime.toISOString();
  }

  onSubmit(): void {
    const timeSlots = this.selectedIntervals.map(interval => {
      const [start, end] = interval.split(' - ');
      return {
        userId: this.timeSlotData.userId,
        startTime: this.formatDateTime(this.selectedDate, start),
        endTime: this.formatDateTime(this.selectedDate, end),
        isAvailable: true
      };
    });

    let successCount = 0;
    let errorCount = 0;

    timeSlots.forEach(slot => {
      this.teacherService.createTimeSlot(slot).subscribe(
        () => {
          successCount++;
          this.message = 'Слоти створено успішно';
        },
        () => {
          errorCount++;
          this.message = 'Помилка при створенні слоту';
        }
      );
    });
  }

  trackByValue(index: number, item: any): string {
    return item.value;
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
