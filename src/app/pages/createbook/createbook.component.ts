import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createbook',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  bookingForm: FormGroup;
  teachers: any[] = [];
  timeslots: any[] = [];
  userId: string = '';
  message: string = ''; // Додати змінну для повідомлення

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.bookingForm = this.fb.group({
      teacherId: ['', Validators.required],
      timeslotId: ['', Validators.required],
      message: [''],
      status: [''],
    });
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

  ngOnInit(): void {
    this.loadTeachers();
    this.fetchChatId();
  }

  loadTeachers(): void {
    this.http.get('http://localhost:5258/api/teacher/get-all').subscribe((data: any) => {
      this.teachers = data;
      console.log(this.teachers);
    });
  }

  loadTimeslots(teacherId: string): void {
    console.log('Loading timeslots for teacher:', teacherId);
    this.http.get('http://localhost:5258/api/timeslot/get-all').subscribe((data: any) => {
      this.timeslots = data.filter((timeslot: any) => timeslot.userId === teacherId && timeslot.isAvailable === true);
      if (this.timeslots.length > 0) {
        console.log('Matching timeslots:', this.timeslots);
      } else {
        console.log('No matching timeslots found');
      }
    });
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        const chatId = response.chatId;
        console.log('Chat ID:', chatId); // Вивід chatId в консоль
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
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
          this.userId = data.id; // Зберігаємо отриманий userId
          console.log('User ID:', this.userId); // Log the user ID
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onTeacherChange(event: any): void {
    const teacherId = event.target.value;
    this.loadTimeslots(teacherId);
  }

  submitBooking(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        userId: this.userId,
        timeslotId: this.bookingForm.get('timeslotId')?.value,
        status: this.bookingForm.get('status')?.value,
        message: this.bookingForm.get('message')?.value,
      };

      console.log('Booking data:', bookingData);

      this.http.post('http://localhost:5258/api/booking/create', bookingData).subscribe(response => {
        console.log('Booking successful', response);
        this.message = 'Букінг успішно відправлений!'; // Встановити повідомлення про успіх
      }, error => {
        console.error('Booking failed', error);
        console.error('Error response:', error); // Логувати помилку для налагодження
        this.message = 'Помилка при відправленні букінгу.'; // Встановити повідомлення про помилку
      });
    }
  }

}
