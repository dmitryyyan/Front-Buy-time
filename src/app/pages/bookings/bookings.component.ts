import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // Для здійснення HTTP запитів
import { Router } from '@angular/router';
import { TimeslotService } from '../../services/timeslot.service';

interface UserData {
  id: string; // Ensure the Id property is included
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  description: string;
  tags: string;
  message?: string;
}
interface BookingSlot {
  id: string;
  status: string;
  message: string;
  createdAt: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  user?: UserData; // Додано опціональну властивість user
}
interface TimeSlot {
  timeslots: string;
  userId: string;
  firstName: string;
  user?: UserData; // Додано опціональну властивість user
}
@Component({
  selector: 'app-bookings',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsService]
})
export class BookingsComponent implements OnInit {
  bookings: BookingSlot[] = [];
  userData: UserData | null = null;
  chatId: string | null = null;
  timeslots: TimeSlot[] = []; // Оновлено для масиву TimeSlot
  selectedFirstName: string = ''; // Додано змінну для firstName
  usersArray: UserData[] = []; // Перенесено масив у клас для спільного використання

  

   // Змінна для зберігання слів
  constructor(
    private bookingsService: BookingsService,
    private userDataService: UserDataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchChatId();
    this.fetchBookSlotsById(''); // Завантажити слоти для конкретного вчителя
     // Завантажити слоти для конкретного вчителя
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        this.chatId = response.chatId;
        console.log('Chat ID:', this.chatId); // Вивід chatId в консоль
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
    this.http.get<UserData>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
          this.userData = data; // Зберігаємо отримані дані користувача
          console.log('User Data:', data); // Log the entire user data
          if (data.id) {
            console.log('User ID:', data.id); // Log the user ID
            this.fetchBookSlotsById(data.id); // Викликати метод тут з потрібним userId
          } else {
            console.error('User ID is undefined');
          }
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }



  fetchBookSlotsById(userId: string): void {
    this.bookingsService.getAllBookings().subscribe(
      (data) => {
        console.log('Fetched all time slots:', data); // Log all fetched data
        console.log(userId); // Log the user ID
        for (let slot of data) {
          if (slot.userId.toLowerCase() === userId.toLowerCase()) {
            const timeslotId = slot.timeslotId; // Extract timeslotId
            console.log('Passing timeslotId to getTimeSlotsById:', timeslotId);
            this.getTimeSlotsById(timeslotId);

            // Передаємо slot.userId замість timeslotId
            this.http.get<UserData>(`http://localhost:5258/api/user/get-by-id?id=${slot.userId}`).subscribe(
              (userData) => {
                console.log('Отримано дані користувача:', userData); // Лог даних користувача
                if (userData && userData.firstName) {
                  console.log('Fetched user data for slot:', userData.firstName); // Лог firstName
                  slot.user = userData; // Додавання даних користувача до слоту
                  this.userData = { 
                    ...this.userData, 
                    firstName: userData.firstName // Оновлюємо firstName
                  } as UserData;
                } else {
                  console.error('Неправильні дані користувача або відсутнє firstName:', userData);
                }
                this.bookings.push(slot);
              },
              (error) => {
                console.error('Помилка отримання даних користувача:', error);
                this.bookings.push(slot); // Додавання слоту, навіть якщо не вдалося отримати дані користувача
              }
            );
          } else {
            console.log('No match for userId:', userId);
          }
        }
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }

  getTimeSlotsById(timeslotId: string): void {
    console.log(`Отримання слотів за id: ${timeslotId}`);
    this.http.get<TimeSlot[]>(`http://localhost:5258/api/timeslot/get-by-id?id=${timeslotId}`).subscribe(
      (data: TimeSlot[]) => {
        console.log('Повна відповідь:', data); // Лог повної відповіді для налагодження
        if (Array.isArray(data)) {
          data.forEach((slot, index) => {
            if (slot && slot.userId) {
              console.log(`Слот ${index + 1}: userId = ${slot.userId}`); // Лог userId для кожного слота

              // Передаємо slot.userId у відповідний метод
              this.http.get<UserData>(`http://localhost:5258/api/user/get-by-id?id=${slot.userId}`).subscribe(
                (userData) => {
                  console.log('Отримано дані користувача:', userData); // Лог даних користувача
                  if (userData && userData.firstName) {
                    console.log('Ім\'я користувача:', userData.firstName); // Лог firstName

                    // Оновлюємо всі бронювання, пов'язані з цим користувачем
                    this.bookings.forEach(booking => {
                      if (booking.userId.toLowerCase() === userData.id.toLowerCase()) {
                        booking.user = userData; // Призначаємо користувача бронюванню
                      }
                    });

                    // Завжди додаємо користувача до масиву
                    this.usersArray.push(userData); // Завжди додаємо користувача до масиву
                    console.log(`Користувач доданий до масиву:`, userData);
                    console.log(`Поточний масив користувачів:`, this.usersArray);
                    console.log(`Користувачі в масиві:`, this.usersArray); // Лог масиву

                    // Відображаємо імена користувачів у відповідному порядку
                    this.selectedFirstName = this.usersArray.map(user => user.firstName).join(', '); // Об'єднуємо всі імена через кому
                  } else {
                    console.error('Дані користувача відсутні або некоректні:', userData);
                    slot.user = null; // Встановлюємо null, якщо дані некоректні
                  }
                },
                (error) => {
                  console.error('Помилка отримання даних користувача:', error);
                  slot.user = null; // Встановлюємо null у разі помилки
                }
              );
            } else {
              console.error(`Слот ${index + 1}: Відсутній userId або неправильна структура даних`, slot);
            }
          });
        } else {
          console.error('Неправильна структура даних або відсутній userId:', data);
        }
      },
      (error) => {
        console.error('Помилка отримання слотів:', error);
      }
    );
  }

  navigateToUserPage(): void {
    this.router.navigate(['/user-page']);
  }

}
