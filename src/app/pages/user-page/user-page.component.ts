import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Додайте ReactiveFormsModule
import { HttpClient } from '@angular/common/http'; // Для здійснення HTTP запитів
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from '../../services/user-data.service';
import { TimeslotService } from '../../services/timeslot.service';
import { Router } from '@angular/router';

interface UserData {
  id: string; // Ensure the Id property is included
  firstName: string;
  lastName: string;
  email: string;
  telegramChatId: string;
  isTeacher: boolean;
  teacherNickname: string;
  description: string;
  rating: number;
  tags: string;
  message?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  userId: string; // Ensure the TeacherId property is included
}

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule], // Додайте ReactiveFormsModule
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userData: UserData | null = null;
  timeSlots: TimeSlot[] = [];
  test = '';
  chatId: string | null = null;
  userForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private http: HttpClient,
    private timeslotService: TimeslotService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      isTeacher: [false, Validators.required]
    });

    this.userForm.get('isTeacher')?.valueChanges.subscribe((value) => {
      if (this.userData && value !== this.userData.isTeacher && !this.isSubmitting) {
        this.submitUser();
      }
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
    this.fetchChatId();
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
          this.userForm.patchValue({ isTeacher: data.isTeacher }, { emitEvent: false }); // Set the checkbox value without emitting event
          console.log('User Data:', data); // Log the entire user data
          if (data.id) {
            console.log('User ID:', data.id); // Log the user ID
            this.fetchTimeSlotsByTeacherId(data.id); // Викликати метод тут з потрібним userId
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

  fetchTimeSlotsByTeacherId(userId: string): void {
    this.timeslotService.getAllTimeSlots().subscribe(
      (data) => {
        console.log('Fetched all time slots:', data); // Log all fetched data
        console.log(userId); // Log the user ID
        this.timeSlots = data.filter(slot => slot.userId === userId.toLowerCase()); // Filter and store matching timeslots
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }

  submitUser(): void {
    if (this.userForm.valid && this.userData) {
      this.isSubmitting = true;
      const userId = this.userData.id;
      const isTeacher = this.userForm.get('isTeacher')?.value;

      console.log('Toggling isTeacher status for user:', userId, 'to:', isTeacher);

      this.http.put(`http://localhost:5258/api/user/toggle-is-teacher?userId=${userId}`, { isTeacher }).subscribe(response => {
        console.log('User isTeacher status updated successfully', response);
        this.fetchUserData(); // Refresh user data after updating the role
        this.fetchTimeSlotsByTeacherId(userId); // Refresh timeslots after updating the role
        alert(`Ви тепер ${isTeacher ? 'викладач' : 'студент'}`); // Show message box
        this.isSubmitting = false;
      }, error => {
        console.error('Error updating user isTeacher status', error);
        this.isSubmitting = false;
      });
    }
  }

  getLionEmojis(rating: number): string {
    return '🦁'.repeat(rating);
  }

  navigateToAddTimeslotPage() {
    this.router.navigate(['/add-timeslot']);
  }

  navigateToViewTimeslots() {
    this.router.navigate(['/timeslot-page']);
  }

  navigateToViewBookings() {
    this.router.navigate(['/bookings']);
  }
  navigateToViewTimeslot1() {
    this.router.navigate(['/time-slot']);
  }
}
