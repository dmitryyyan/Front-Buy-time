import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../react-ton-connect/teacher.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-timeslot',
  standalone: true,  // Вказуємо, що компонент є standalone
  imports: [         // Імпортуємо необхідні модулі
    CommonModule,    // Для *ngIf та *ngFor
    FormsModule      // Для ngModel
  ],
  templateUrl: './createtimeslot.html',
  styleUrls: ['./createtimeslot.css'],
})
export class AddTimeslotComponent implements OnInit {
  chatId: string | null = null;
  teacher: any;
  timeSlotData: any = {
    userId: '',
    startTime: '',
    endTime: '',
    isAvailable: false,
    tonCount: 1, // Поле для кількості тон
  };

  selectedDate: string = '';
  selectedTimeSlot: string = ''; // Зберігаємо вибраний часовий слот
  availableTimes: string[] = []; // Доступні часові слоти
  selectedIntervals: string[] = []; // Зберігаємо вибрані інтервали

  message: string = '';

  timeSlots = [
    { label: '08:00 – 12:00', value: '08:00-12:00' },
    { label: '12:00 – 16:00', value: '12:00-16:00' },
    { label: '16:00 – 20:00', value: '16:00-20:00' },
  ];

  constructor(
    private teacherService: TeacherService,
    private http: HttpClient,
    private router: Router
  ) {}

  // Button methods
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

  ngOnInit(): void {
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http
      .get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId')
      .subscribe(
        (response) => {
          this.chatId = response.chatId;
          console.log('Chat ID:', this.chatId);
          this.fetchUserData();
        },
        (error) => {
          console.error('Error fetching chat ID', error);
        }
      );
  }

  fetchUserData(): void {
    if (!this.chatId) {
      console.error('Chat ID is not defined');
      return;
    }
    this.http
      .get<{ id: string }>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`)
      .subscribe(
        (data) => {
          console.log('Fetched user data:', data);
          if (data && data.id) {
            this.timeSlotData.userId = data.id;
            console.log('User ID:', data.id);
          } else {
            console.error('User ID is undefined');
          }
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
  }

  // Метод для вибору часових слотів
  selectTimeSlot(timeSlot: string): void {
    this.selectedTimeSlot = timeSlot;
    // Генеруємо доступні інтервали для вибраного часового слоту
    const [startTime, endTime] = timeSlot.split('-');
    this.availableTimes = this.generateTimeIntervals(startTime, endTime);
  }

  generateTimeIntervals(startTime: string, endTime: string): string[] {
    const intervals: string[] = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
      const next = new Date(start.getTime() + 60 * 60000); // Додаємо 1 годину
      intervals.push(`${this.formatTime(start)} – ${this.formatTime(next)}`);
      start = next;
    }

    return intervals;
  }

  formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  // Метод для вибору інтервалу часу
  toggleIntervalSelection(interval: string): void {
    const index = this.selectedIntervals.indexOf(interval);
    if (index > -1) {
      this.selectedIntervals.splice(index, 1); // Видалення інтервалу
    } else {
      this.selectedIntervals.push(interval); // Додавання інтервалу
    }
    console.log('Selected intervals:', this.selectedIntervals); // Логування вибраних інтервалів
  }

  onSubmit(): void {
    // Перевірка на вибір часу та дати
    if (!this.selectedDate) {
      this.message = 'Будь ласка, виберіть дату!';
      return;
    }

    // Перевірка на вибір хоча б одного інтервалу
    if (this.selectedIntervals.length === 0) {
      this.message = 'Будь ласка, виберіть хоча б один слот!';
      return;
    }

    // Перевірка на валідність тонів
    if (isNaN(this.timeSlotData.tonCount) || this.timeSlotData.tonCount <= 0) {
      this.message = 'Будь ласка, вкажіть правильну кількість тонів!';
      return;
    }

    // Створюємо масив об'єктів для кожного вибраного інтервалу
    const timeSlots = this.selectedIntervals.map((interval: string) => {
      const [startTime, endTime] = interval.split(' – '); // Розділяємо час на початок та кінець
      console.log('Selected Time:', interval);
      console.log('Start Time:', startTime, 'End Time:', endTime);

      // Тепер передаємо tonCount у запиті для кожного слоту
      const slot = {
        userId: this.timeSlotData.userId,
        startTime: this.formatDateTime(this.selectedDate, startTime),
        endTime: this.formatDateTime(this.selectedDate, endTime),
        tonCount: this.timeSlotData.tonCount, // Додаємо кількість тонів
        isAvailable: true
      };

      console.log('Slot data being sent:', slot); // Перевірка, що дані передаються правильно
      return slot;
    });

    let successCount = 0;
    let errorCount = 0;
    let completedRequests = 0;

    // Відправляємо кожен слот
    timeSlots.forEach(slot => {
      console.log('Creating time slot:', slot); // Логування слоту
      this.teacherService.createTimeSlot(slot).subscribe(
        response => {
          console.log('Time slot created:', response);
          successCount++; // Інкрементуємо лічильник успішних запитів
          completedRequests++; // Інкрементуємо лічильник завершених запитів
          if (completedRequests === timeSlots.length) {
            this.showResultMessage(successCount, errorCount);
          }
        },
        error => {
          console.error('Error creating time slot:', error);
          errorCount++; // Інкрементуємо лічильник помилок
          completedRequests++; // Інкрементуємо лічильник завершених запитів
          if (completedRequests === timeSlots.length) {
            this.showResultMessage(successCount, errorCount);
          }
        }
      );
    });
  }

  // Функція для відображення результату після завершення всіх запитів
  showResultMessage(successCount: number, errorCount: number): void {
    const message = `Успішно створено ${successCount} слотів. Сталася ${errorCount} помилка(ок).`;
    alert(message); // Виводимо результат через alert
  }

  formatDateTime(date: string, time: string): string {
    const dateTimeString = `${date}T${time}:00`;

    if (!date || !time) {
      console.error('Invalid date or time:', date, time);
      return '';
    }

    const dateTime = new Date(dateTimeString);

    if (isNaN(dateTime.getTime())) {
      console.error('Invalid DateTime:', dateTimeString);
      return '';
    }

    dateTime.setHours(dateTime.getHours() + 2); // Додаємо 2 години
    return dateTime.toISOString();
  }
}
